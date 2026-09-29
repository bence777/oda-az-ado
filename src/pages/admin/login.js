import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import { isAdminRequest } from "../../lib/adminAuth";

const ui = {
  bg: "#F5F7FB",
  panel: "#FFFFFF",
  border: "#E4E9F1",
  text: "#101828",
  muted: "#667085",
  quiet: "#98A2B3",
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  danger: "#B42318",
  dangerBg: "#FEF3F2",
};

export async function getServerSideProps({ req, query }) {
  const next = typeof query.next === "string" && query.next.startsWith("/admin")
    ? query.next
    : "/admin";
  if (isAdminRequest(req)) {
    return { redirect: { destination: next, permanent: false } };
  }
  return { props: { next } };
}

export default function AdminLogin({ next }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        setMessage(body.message || "A belépés nem sikerült.");
        return;
      }

      setStatus("done");
      router.replace(next || "/admin");
    } catch {
      setStatus("error");
      setMessage("A belépés most nem érhető el. Próbáld újra.");
    }
  }

  return (
    <>
      <Head>
        <title>Admin belépés – ODA-AZ-ADÓ</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>

      <Box minH="100vh" bg={ui.bg} color={ui.text} display="grid" placeItems="center" px={5} py={10}>
        <Box w="100%" maxW="420px">
          <Box mb={7} display="flex" alignItems="center" gap={3}>
            <Box w="42px" h="42px" borderRadius="12px" bg={ui.text} color="#fff" display="grid" placeItems="center" fontSize="13px" fontWeight="800" letterSpacing="-.02em">
              OA
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="750" lineHeight="1.25">ODA-AZ-ADÓ</Text>
              <Text mt={0.5} fontSize="12px" color={ui.muted}>Belső leadkezelő</Text>
            </Box>
          </Box>

          <Box as="form" onSubmit={submit} border={`1px solid ${ui.border}`} bg={ui.panel} borderRadius="16px" p={{ base: 6, md: 8 }} boxShadow="0 16px 48px rgba(16,24,40,.06)">
            <Text fontSize="24px" fontWeight="750" letterSpacing="-.03em">Belépés</Text>
            <Text mt={2} mb={7} fontSize="13px" lineHeight="1.65" color={ui.muted}>
              Az ajánlatkérések és belső megjegyzések csak ezen a védett felületen érhetők el.
            </Text>

            <label htmlFor="password" style={{ display: "block", fontSize: "12px", fontWeight: 650, color: ui.text, marginBottom: "8px" }}>
              Admin jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••••••"
              style={{
                width: "100%",
                height: "46px",
                border: `1px solid ${ui.border}`,
                borderRadius: "9px",
                padding: "0 13px",
                outline: "none",
                fontSize: "14px",
                color: ui.text,
                background: "#fff",
              }}
            />

            <Box
              as="button"
              type="submit"
              disabled={status === "sending"}
              mt={4}
              w="100%"
              h="46px"
              border="0"
              borderRadius="9px"
              bg={ui.primary}
              color="#fff"
              fontSize="13px"
              fontWeight="700"
              cursor={status === "sending" ? "wait" : "pointer"}
              transition="160ms ease"
              _hover={{ bg: status === "sending" ? ui.primary : ui.primaryHover }}
            >
              {status === "sending" ? "Belépés…" : "Belépés az adminba"}
            </Box>

            {message ? (
              <Box mt={4} px={3.5} py={3} borderRadius="8px" bg={ui.dangerBg} border="1px solid #FECDCA">
                <Text fontSize="12px" lineHeight="1.55" color={ui.danger}>{message}</Text>
              </Box>
            ) : null}
          </Box>

          <Text mt={5} textAlign="center" fontSize="11px" color={ui.quiet}>
            A felület nincs linkelve a publikus weboldal navigációjából.
          </Text>
        </Box>
      </Box>
    </>
  );
}
