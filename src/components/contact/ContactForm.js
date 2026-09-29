import { useRef, useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import design from "../../design/system";

const inputStyle = {
  width: "100%",
  border: 0,
  borderBottom: `1px solid ${design.colors.border}`,
  background: "transparent",
  color: design.colors.ink,
  fontSize: "15px",
  lineHeight: "1.5",
  padding: "14px 0",
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "9px",
  fontWeight: 650,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: design.colors.quiet,
};

function Field({ label, name, type = "text", required = false, placeholder = "", autoComplete }) {
  return (
    <Box>
      <label htmlFor={name} style={labelStyle}>{label}{required ? " *" : ""}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} style={inputStyle} />
    </Box>
  );
}

function SelectField({ label, name, options, required = true }) {
  return (
    <Box>
      <label htmlFor={name} style={labelStyle}>{label}{required ? " *" : ""}</label>
      <select id={name} name={name} required={required} defaultValue="" style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
        <option value="" disabled>Válasszon</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </Box>
  );
}

function buildMailBody(values) {
  const rows = [
    ["Név", values.name],
    ["Cégnév", values.company],
    ["E-mail", values.email],
    ["Telefonszám", values.phone],
    ["Adószám", values.taxId],
    ["Havi átlagos bizonylatszám", values.monthlyDocuments],
    ["Bankszámlák száma", values.bankAccounts],
    ["Munkavállalók száma", values.employees],
    ["Külföldi / EU-s ügyletek", values.foreignTransactions],
    ["Érdeklődés oka", values.reason],
    ["Tervezett kezdés", values.plannedStart],
    ["Megjegyzés", values.message],
  ];
  return rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");
}

export default function ContactForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    if (values.website) return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });

      if (response.ok) {
        setStatus("sent");
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { form_name: "ajanlatkeres" });
        }
        setMessage("Köszönjük. Az ajánlatkérés megérkezett.");
        form.reset();
        startedAt.current = Date.now();
        return;
      }

      const result = await response.json().catch(() => ({}));
      if (result?.code !== "delivery_not_configured") {
        throw new Error(result?.message || "send_failed");
      }

      const subject = `Ajánlatkérés${values.company ? ` – ${values.company}` : ""}`;
      window.location.href = `mailto:info@odaazado.hu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailBody(values))}`;
      setStatus("fallback");
      setMessage("A szerveroldali kézbesítés még nincs beállítva, ezért megnyitottuk a levelezőprogramját az adatokkal.");
    } catch (error) {
      setStatus("error");
      setMessage("Az űrlapot most nem sikerült elküldeni. Kérjük, írjon az info@odaazado.hu címre.");
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Box position="absolute" left="-10000px" w="1px" h="1px" overflow="hidden" aria-hidden="true">
        <label htmlFor="website">Weboldal</label>
        <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </Box>

      <Text mb={7} fontSize="10px" lineHeight="1.65" color={design.colors.quiet}>
        Az első kapcsolatfelvételhez csak az ajánlat előkészítéséhez szükséges adatokat kérjük. Főkönyvi kivonatot, szerződést vagy korábbi könyvelési anyagot itt nem kell feltölteni.
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 10 }}>
        <Field label="Név" name="name" required autoComplete="name" placeholder="Az Ön neve" />
        <Field label="Cégnév" name="company" required autoComplete="organization" placeholder="Vállalkozás neve" />
        <Field label="E-mail" name="email" type="email" required autoComplete="email" placeholder="nev@ceg.hu" />
        <Field label="Telefonszám" name="phone" type="tel" required autoComplete="tel" placeholder="+36 …" />
        <Field label="Adószám" name="taxId" required placeholder="12345678-2-41" />
        <SelectField label="Havi átlagos bizonylatszám" name="monthlyDocuments" options={["0–50", "51–100", "101–250", "251–500", "500+"]} />
        <SelectField label="Bankszámlák száma" name="bankAccounts" options={["1", "2", "3", "4+"]} />
        <SelectField label="Munkavállalók száma" name="employees" options={["0–3", "4–10", "11–25", "26+"]} />
        <SelectField label="Külföldi / EU-s ügyletek" name="foreignTransactions" options={["Nincs", "EU-n belüli ügyletek", "EU-n kívüli ügyletek", "Mindkettő"]} />
        <SelectField label="Érdeklődés oka" name="reason" options={["Könyvelőt váltanék", "Új vállalkozás", "Meglévő vállalkozás új könyvelőt keres", "Könyvelési szolgáltatás bővítése", "Adótanácsadás", "Egyéb"]} />
        <SelectField label="Tervezett kezdés" name="plannedStart" options={["Azonnal", "1–3 hónapon belül", "2027. január 1-től", "Később"]} />
      </Grid>

      <Box mt={10}>
        <label htmlFor="message" style={labelStyle}>Egyéb üzenet / megjegyzés</label>
        <textarea id="message" name="message" rows="5" placeholder="Van még valami, amit fontosnak tart? Röviden leírhatja a helyzetét, kérdését vagy speciális igényét." style={{ ...inputStyle, resize: "vertical", minHeight: "145px" }} />
      </Box>

      <Box mt={7}>
        <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" name="privacy" required style={{ marginTop: "3px" }} />
          <span style={{ fontSize: "10px", lineHeight: 1.65, color: design.colors.muted }}>
            Hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel és az ajánlatadás céljából kezeljék.
          </span>
        </label>
      </Box>

      <Grid mt={9} templateColumns={{ base: "1fr", sm: "auto 1fr" }} gap={5} alignItems="center">
        <Box as="button" type="submit" disabled={status === "sending"} px={8} py={4} border="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" cursor={status === "sending" ? "wait" : "pointer"} transition={design.transition} _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>
          {status === "sending" ? "Küldés…" : "Ajánlatot kérek"}
        </Box>
        <Text fontSize="10px" lineHeight="1.55" color={design.colors.quiet}>
          A részletes könyvelési anyagokra csak akkor lesz szükség, amikor már látjuk, hogy az együttműködés releváns.
        </Text>
      </Grid>

      {message ? <Text mt={5} fontSize="12px" color={status === "error" ? "#8A3B32" : design.colors.muted}>{message}</Text> : null}
    </Box>
  );
}
