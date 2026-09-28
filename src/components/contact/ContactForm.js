import { useRef, useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
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
const labelStyle = { display: "block", fontSize: "9px", fontWeight: 650, letterSpacing: ".08em", textTransform: "uppercase", color: design.colors.quiet };

function Field({ label, name, type = "text", required = false, placeholder = "", autoComplete }) {
  return <Box><label htmlFor={name} style={labelStyle}>{label}{required ? " *" : ""}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} style={inputStyle} /></Box>;
}

const intents = ["Könyvelés", "Adótanácsadás", "Bérszámfejtés", "Könyvelőváltás", "Még nem tudom"];

function buildMailBody(values) {
  return [
    `Név: ${values.name || ""}`,
    `Cégnév: ${values.company || ""}`,
    `E-mail: ${values.email || ""}`,
    `Telefonszám: ${values.phone || ""}`,
    `Téma: ${values.intent || ""}`,
    "",
    "Üzenet:",
    values.message || "",
  ].join("\n");
}

export default function ContactForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    if (values.website) return;
    setStatus("sending"); setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, intent, startedAt: startedAt.current }),
      });
      if (response.ok) {
        setStatus("sent"); setMessage("Köszönjük. Az üzenet megérkezett."); form.reset(); setIntent(""); startedAt.current = Date.now(); return;
      }
      const result = await response.json().catch(() => ({}));
      if (result?.code !== "delivery_not_configured") throw new Error(result?.message || "send_failed");

      const subject = `Kapcsolatfelvétel${values.company ? ` – ${values.company}` : ""}`;
      window.location.href = `mailto:info@odaazado.hu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailBody({ ...values, intent }))}`;
      setStatus("fallback"); setMessage("Megnyitottuk a levelezőprogramját az üzenet adataival.");
    } catch (error) {
      setStatus("error"); setMessage("Az űrlapot most nem sikerült elküldeni. Kérjük, írjon az info@odaazado.hu címre.");
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Box position="absolute" left="-10000px" w="1px" h="1px" overflow="hidden" aria-hidden="true"><label htmlFor="website">Weboldal</label><input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" /></Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 10 }}>
        <Field label="Név" name="name" required autoComplete="name" placeholder="Az Ön neve" />
        <Field label="E-mail" name="email" type="email" required autoComplete="email" placeholder="nev@ceg.hu" />
      </Grid>

      <Box mt={10}>
        <label htmlFor="message" style={labelStyle}>Röviden a helyzetről *</label>
        <textarea id="message" name="message" required rows="5" placeholder="Elég 2–3 mondat. Például: működő Kft., könyvelőváltást tervezünk, 8 fő alkalmazott…" style={{ ...inputStyle, resize: "vertical", minHeight: "145px" }} />
      </Box>

      <Box mt={7}>
        <Box
          as="button"
          type="button"
          onClick={() => setShowDetails((value) => !value)}
          aria-expanded={showDetails}
          display="flex"
          alignItems="center"
          gap={3}
          border="0"
          bg="transparent"
          p="0"
          color={design.colors.ink}
          cursor="pointer"
          fontSize="10px"
          fontWeight="600"
        >
          <Box as="span" w="18px" h="18px" border="1px solid" borderColor={design.colors.border} display="grid" placeItems="center" fontSize="13px" lineHeight="1">{showDetails ? "−" : "+"}</Box>
          További adatok megadása <Box as="span" fontWeight="400" color={design.colors.quiet}>(opcionális)</Box>
        </Box>

        {showDetails ? (
          <Box mt={7} p={{ base: 5, md: 6 }} bg={design.colors.offWhite}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 7, md: 9 }}>
              <Field label="Cégnév" name="company" autoComplete="organization" placeholder="Opcionális" />
              <Field label="Telefonszám" name="phone" type="tel" autoComplete="tel" placeholder="Opcionális" />
            </Grid>
            <Box mt={8}>
              <Text mb={4} fontSize="9px" fontWeight="650" letterSpacing=".08em" textTransform="uppercase" color={design.colors.quiet}>Miben segíthetünk?</Text>
              <Flex gap={2} wrap="wrap">
                {intents.map((item) => {
                  const active = intent === item;
                  return <Box key={item} as="button" type="button" onClick={() => setIntent(active ? "" : item)} px={4} py={2.5} border="1px solid" borderColor={active ? design.colors.ink : design.colors.border} bg={active ? design.colors.ink : "transparent"} color={active ? "#fff" : design.colors.graphite} fontSize="10px" cursor="pointer" transition={design.transition}>{item}</Box>;
                })}
              </Flex>
            </Box>
          </Box>
        ) : null}
      </Box>

      <Box mt={7}>
        <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" name="privacy" required style={{ marginTop: "3px" }} />
          <span style={{ fontSize: "10px", lineHeight: 1.65, color: design.colors.muted }}>Hozzájárulok, hogy a megadott adataimat a kapcsolatfelvétel és az ajánlatadás céljából kezeljék.</span>
        </label>
      </Box>

      <Grid mt={9} templateColumns={{ base: "1fr", sm: "auto 1fr" }} gap={5} alignItems="center">
        <Box as="button" type="submit" disabled={status === "sending"} px={8} py={4} border="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" cursor={status === "sending" ? "wait" : "pointer"} transition={design.transition} _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>
          {status === "sending" ? "Küldés…" : "Elküldöm"}
        </Box>
        <Text fontSize="10px" lineHeight="1.55" color={design.colors.quiet}>Nem kell minden adatot előre tudnia. A részleteket az egyeztetésen pontosítjuk.</Text>
      </Grid>

      {message ? <Text mt={5} fontSize="12px" color={status === "error" ? "#8A3B32" : design.colors.muted}>{message}</Text> : null}
    </Box>
  );
}
