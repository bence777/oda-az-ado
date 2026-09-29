import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Grid, Text } from "@chakra-ui/react";
import {
  ACTIVE_LEAD_STATUSES,
  LEAD_STATUSES,
  getLeadStatusMeta,
} from "../../data/leadStatuses";
import { isAdminRequest } from "../../lib/adminAuth";
import { listLeads } from "../../lib/supabaseAdmin";

const ui = {
  bg: "#F5F7FB",
  panel: "#FFFFFF",
  border: "#E4E9F1",
  borderStrong: "#D5DCE7",
  text: "#101828",
  textSoft: "#344054",
  muted: "#667085",
  quiet: "#98A2B3",
  primary: "#2563EB",
  primarySoft: "#EFF4FF",
  primaryBorder: "#D1E0FF",
  success: "#067647",
  successBg: "#ECFDF3",
  danger: "#B42318",
  dangerBg: "#FEF3F2",
  warning: "#B54708",
  warningBg: "#FFFAEB",
};

export async function getServerSideProps({ req, query }) {
  if (!isAdminRequest(req)) {
    return { redirect: { destination: `/admin/login?next=${encodeURIComponent(req.url || "/admin")}`, permanent: false } };
  }

  try {
    const leads = await listLeads({ limit: 250 });
    const requested = typeof query.lead === "string" ? query.lead : "";
    const initialSelectedId = leads?.some((lead) => lead.id === requested)
      ? requested
      : leads?.[0]?.id || null;
    return {
      props: {
        initialLeads: leads || [],
        initialSelectedId,
        loadError: "",
      },
    };
  } catch (error) {
    return {
      props: {
        initialLeads: [],
        initialSelectedId: null,
        loadError: "A Supabase kapcsolat még nincs megfelelően konfigurálva.",
      },
    };
  }
}

function formatDate(value, withTime = true) {
  if (!value) return "–";
  try {
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function relativeDate(value) {
  if (!value) return "–";
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return formatDate(value);
  const diff = Date.now() - time;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "most";
  if (diff < hour) return `${Math.floor(diff / minute)} perce`;
  if (diff < day) return `${Math.floor(diff / hour)} órája`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} napja`;
  return formatDate(value, false);
}

function StatusBadge({ status, compact = false }) {
  const meta = getLeadStatusMeta(status);
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap={2}
      bg={meta.bg}
      color={meta.color}
      borderRadius="999px"
      px={compact ? 2.5 : 3}
      py={compact ? 1.25 : 1.5}
      fontSize={compact ? "10px" : "11px"}
      fontWeight="700"
      lineHeight="1"
      whiteSpace="nowrap"
    >
      <Box w="6px" h="6px" borderRadius="50%" bg={meta.dot} />
      {status}
    </Box>
  );
}

function NotificationBadge({ lead }) {
  const status = lead?.notification_status || "not_configured";
  const meta = {
    sent: { label: "E-mail elküldve", bg: ui.successBg, color: ui.success, dot: "#12B76A" },
    pending: { label: "Küldés folyamatban", bg: ui.warningBg, color: ui.warning, dot: "#F79009" },
    failed: { label: "E-mail hiba", bg: ui.dangerBg, color: ui.danger, dot: "#F04438" },
    not_configured: { label: "SMTP nincs beállítva", bg: "#F2F4F7", color: ui.muted, dot: ui.quiet },
  }[status] || { label: status, bg: "#F2F4F7", color: ui.muted, dot: ui.quiet };

  return (
    <Box display="inline-flex" alignItems="center" gap={2} bg={meta.bg} color={meta.color} borderRadius="999px" px={2.5} py={1.25} fontSize="10px" fontWeight="700">
      <Box w="6px" h="6px" borderRadius="50%" bg={meta.dot} />
      {meta.label}
    </Box>
  );
}

function MetricCard({ label, value, hint, accent }) {
  return (
    <Box bg={ui.panel} border={`1px solid ${ui.border}`} borderRadius="12px" p={5} minW="0">
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
        <Text fontSize="12px" fontWeight="650" color={ui.muted}>{label}</Text>
        <Box w="8px" h="8px" borderRadius="50%" bg={accent} />
      </Box>
      <Text mt={3} fontSize="28px" fontWeight="760" letterSpacing="-.04em" lineHeight="1">{value}</Text>
      <Text mt={2} fontSize="11px" color={ui.quiet}>{hint}</Text>
    </Box>
  );
}

function DetailField({ label, value, href }) {
  const content = value || "–";
  return (
    <Box minW="0">
      <Text fontSize="10px" fontWeight="700" textTransform="uppercase" letterSpacing=".06em" color={ui.quiet}>{label}</Text>
      {href && value ? (
        <Box as="a" href={href} mt={1.5} display="inline-block" fontSize="13px" lineHeight="1.55" fontWeight="600" color={ui.primary} overflowWrap="anywhere">
          {content}
        </Box>
      ) : (
        <Text mt={1.5} fontSize="13px" lineHeight="1.55" fontWeight="600" color={ui.textSoft} overflowWrap="anywhere">{content}</Text>
      )}
    </Box>
  );
}

function Timeline({ events, loading }) {
  if (loading) {
    return <Text fontSize="12px" color={ui.quiet}>Előzmények betöltése…</Text>;
  }
  if (!events.length) {
    return <Text fontSize="12px" color={ui.quiet}>Még nincs naplózott esemény.</Text>;
  }

  const labels = {
    created: "Lead létrejött",
    status_changed: "Státusz módosítva",
    note_updated: "Belső megjegyzés frissítve",
    notification_sent: "E-mail értesítés elküldve",
    notification_failed: "E-mail értesítés sikertelen",
    notification_skipped: "E-mail értesítés nincs konfigurálva",
  };

  return (
    <Box>
      {events.map((event, index) => (
        <Box key={event.id} display="grid" gridTemplateColumns="18px minmax(0,1fr)" gap={3} pb={index === events.length - 1 ? 0 : 5} position="relative">
          <Box position="relative" display="flex" justifyContent="center">
            <Box mt="5px" w="8px" h="8px" borderRadius="50%" bg={event.event_type === "notification_failed" ? "#F04438" : ui.primary} zIndex="1" />
            {index !== events.length - 1 ? <Box position="absolute" top="13px" bottom="-20px" w="1px" bg={ui.border} /> : null}
          </Box>
          <Box minW="0">
            <Box display="flex" justifyContent="space-between" gap={3} alignItems="flex-start">
              <Text fontSize="12px" fontWeight="700" color={ui.textSoft}>{labels[event.event_type] || event.event_type}</Text>
              <Text flex="0 0 auto" fontSize="10px" color={ui.quiet}>{relativeDate(event.created_at)}</Text>
            </Box>
            {event.details ? <Text mt={1} fontSize="11px" lineHeight="1.55" color={ui.muted}>{event.details}</Text> : null}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function EmptyState({ filtered }) {
  return (
    <Box py={14} px={6} textAlign="center">
      <Box mx="auto" w="42px" h="42px" borderRadius="12px" bg="#F2F4F7" display="grid" placeItems="center" color={ui.quiet} fontSize="18px">◎</Box>
      <Text mt={4} fontSize="13px" fontWeight="700" color={ui.text}>{filtered ? "Nincs találat" : "Még nincs érdeklődő"}</Text>
      <Text mt={1.5} fontSize="12px" color={ui.muted}>{filtered ? "Módosítsd a keresést vagy a szűrőt." : "Az első ajánlatkérés itt fog megjelenni."}</Text>
    </Box>
  );
}

export default function AdminLeads({ initialLeads, initialSelectedId, loadError }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [selectedLead, setSelectedLead] = useState(initialLeads.find((lead) => lead.id === initialSelectedId) || null);
  const [events, setEvents] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filter, setFilter] = useState("Összes státusz");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(() => new Date().toISOString());
  const [message, setMessage] = useState(loadError || "");
  const [messageType, setMessageType] = useState(loadError ? "error" : "success");
  const [noteDraft, setNoteDraft] = useState(selectedLead?.internal_note || "");

  const metrics = useMemo(() => ({
    total: leads.length,
    new: leads.filter((lead) => lead.status === "Új érdeklődő").length,
    active: leads.filter((lead) => ACTIVE_LEAD_STATUSES.includes(lead.status)).length,
    won: leads.filter((lead) => lead.status === "Megnyerte").length,
  }), [leads]);

  const statusCounts = useMemo(() => {
    const counts = {};
    for (const status of LEAD_STATUSES) counts[status] = 0;
    for (const lead of leads) counts[lead.status] = (counts[lead.status] || 0) + 1;
    return counts;
  }, [leads]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("hu-HU");
    return leads.filter((lead) => {
      if (filter !== "Összes státusz" && lead.status !== filter) return false;
      if (!query) return true;
      const haystack = [lead.company, lead.name, lead.email, lead.phone, lead.tax_id, lead.reason]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("hu-HU");
      return haystack.includes(query);
    });
  }, [filter, leads, search]);

  async function loadDetail(id, { updateUrl = true } = {}) {
    if (!id) return;
    setSelectedId(id);
    setDetailLoading(true);
    setMessage("");
    if (updateUrl) {
      router.replace({ pathname: "/admin", query: { lead: id } }, undefined, { shallow: true });
    }

    try {
      const response = await fetch(`/api/admin/leads/${id}`);
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.lead) throw new Error(body.message || "A lead nem tölthető be.");
      setSelectedLead(body.lead);
      setNoteDraft(body.lead.internal_note || "");
      setEvents(body.events || []);
      setLeads((current) => current.map((lead) => lead.id === id ? body.lead : lead));
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "A lead nem tölthető be.");
    } finally {
      setDetailLoading(false);
    }
  }

  useEffect(() => {
    if (initialSelectedId) loadDetail(initialSelectedId, { updateUrl: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshLeads() {
    setRefreshing(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/leads?limit=250");
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || "A frissítés nem sikerült.");
      setLeads(body.leads || []);
      setLastRefreshedAt(new Date().toISOString());
      if (selectedId) await loadDetail(selectedId, { updateUrl: false });
      setMessageType("success");
      setMessage("Lista frissítve.");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "A frissítés nem sikerült.");
    } finally {
      setRefreshing(false);
    }
  }

  async function savePatch(patch, successMessage = "Mentve.") {
    if (!selectedId) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/leads/${selectedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.lead) throw new Error(body.message || "A mentés nem sikerült.");
      setSelectedLead(body.lead);
      setNoteDraft(body.lead.internal_note || "");
      setEvents(body.events || []);
      setLeads((current) => current.map((lead) => lead.id === selectedId ? body.lead : lead));
      setMessageType("success");
      setMessage(successMessage);
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "A mentés nem sikerült.");
    } finally {
      setSaving(false);
    }
  }

  async function resendNotification() {
    if (!selectedId) return;
    setNotifying(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/leads/${selectedId}/notify`, { method: "POST" });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.message || "Az értesítés nem sikerült.");
      if (body.lead) {
        setSelectedLead(body.lead);
        setLeads((current) => current.map((lead) => lead.id === selectedId ? body.lead : lead));
      }
      await loadDetail(selectedId, { updateUrl: false });
      setMessageType("success");
      setMessage(body.message || "Az értesítő e-mail elküldve.");
    } catch (error) {
      await loadDetail(selectedId, { updateUrl: false });
      setMessageType("error");
      setMessage(error.message || "Az értesítés nem sikerült.");
    } finally {
      setNotifying(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <>
      <Head>
        <title>Leadkezelő – ODA-AZ-ADÓ</title>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>

      <Box minH="100vh" bg={ui.bg} color={ui.text}>
        <Box position="sticky" top="0" zIndex="20" bg="rgba(255,255,255,.96)" backdropFilter="blur(12px)" borderBottom={`1px solid ${ui.border}`}>
          <Box maxW="1600px" mx="auto" px={{ base: 4, md: 7 }} h="68px" display="flex" justifyContent="space-between" alignItems="center" gap={4}>
            <Box display="flex" alignItems="center" gap={3} minW="0">
              <Box w="38px" h="38px" flex="0 0 auto" borderRadius="10px" bg={ui.text} color="#fff" display="grid" placeItems="center" fontSize="12px" fontWeight="800">OA</Box>
              <Box minW="0">
                <Text fontSize="13px" fontWeight="750" noOfLines={1}>ODA-AZ-ADÓ</Text>
                <Text mt={0.5} fontSize="11px" color={ui.muted}>Leadkezelő</Text>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Box as="button" onClick={refreshLeads} disabled={refreshing} h="36px" px={3.5} border={`1px solid ${ui.border}`} borderRadius="8px" bg="#fff" color={ui.textSoft} fontSize="11px" fontWeight="650" cursor={refreshing ? "wait" : "pointer"}>
                {refreshing ? "Frissítés…" : "Frissítés"}
              </Box>
              <Box as="button" onClick={logout} h="36px" px={3.5} border={`1px solid ${ui.border}`} borderRadius="8px" bg="#fff" color={ui.muted} fontSize="11px" fontWeight="650" cursor="pointer">
                Kilépés
              </Box>
            </Box>
          </Box>
        </Box>

        <Box maxW="1600px" mx="auto" px={{ base: 4, md: 7 }} py={{ base: 5, md: 7 }}>
          <Box display={{ base: "block", md: "flex" }} justifyContent="space-between" alignItems="flex-end" gap={6} mb={6}>
            <Box>
              <Text fontSize={{ base: "24px", md: "30px" }} fontWeight="760" letterSpacing="-.035em">Érdeklődők</Text>
              <Text mt={1.5} fontSize="12px" color={ui.muted}>Ajánlatkérések, státuszok és belső utánkövetés egy helyen.</Text>
            </Box>
            <Text mt={{ base: 3, md: 0 }} fontSize="11px" color={ui.quiet}>Utolsó frissítés: {formatDate(lastRefreshedAt)}</Text>
          </Box>

          <Grid templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={3} mb={6}>
            <MetricCard label="Összes lead" value={metrics.total} hint="Betöltött érdeklődők" accent="#667085" />
            <MetricCard label="Új" value={metrics.new} hint="Még nincs feldolgozva" accent="#3B82F6" />
            <MetricCard label="Folyamatban" value={metrics.active} hint="Aktív egyeztetések" accent="#F59E0B" />
            <MetricCard label="Megnyert" value={metrics.won} hint="Sikeres érdeklődők" accent="#22C55E" />
          </Grid>

          {message ? (
            <Box mb={4} border={`1px solid ${messageType === "error" ? "#FECDCA" : "#ABEFC6"}`} bg={messageType === "error" ? ui.dangerBg : ui.successBg} color={messageType === "error" ? ui.danger : ui.success} borderRadius="9px" px={4} py={3} display="flex" justifyContent="space-between" gap={3} alignItems="center">
              <Text fontSize="11px" fontWeight="600">{message}</Text>
              <Box as="button" onClick={() => setMessage("")} border="0" bg="transparent" color="inherit" cursor="pointer" fontSize="16px" lineHeight="1">×</Box>
            </Box>
          ) : null}

          <Grid templateColumns={{ base: "1fr", xl: "minmax(0,1.28fr) minmax(430px,.72fr)" }} gap={5} alignItems="start">
            <Box bg={ui.panel} border={`1px solid ${ui.border}`} borderRadius="12px" overflow="hidden" minW="0">
              <Box p={4} borderBottom={`1px solid ${ui.border}`} display={{ base: "grid", md: "flex" }} gridTemplateColumns="1fr" gap={3} alignItems="center">
                <Box flex="1" minW="0">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Keresés cég, név, e-mail, adószám alapján…"
                    style={{ width: "100%", height: "40px", border: `1px solid ${ui.border}`, borderRadius: "8px", padding: "0 12px", outline: "none", fontSize: "12px", color: ui.text, background: "#fff" }}
                  />
                </Box>
                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  style={{ height: "40px", minWidth: "190px", border: `1px solid ${ui.border}`, borderRadius: "8px", padding: "0 10px", outline: "none", fontSize: "11px", fontWeight: 600, color: ui.textSoft, background: "#fff" }}
                >
                  <option>Összes státusz</option>
                  {LEAD_STATUSES.map((status) => <option key={status} value={status}>{status} ({statusCounts[status] || 0})</option>)}
                </select>
              </Box>

              <Box display={{ base: "none", md: "grid" }} gridTemplateColumns="minmax(210px,1.2fr) minmax(150px,.8fr) 150px 150px" gap={4} px={5} py={3} borderBottom={`1px solid ${ui.border}`} bg="#FAFBFC">
                <Text fontSize="10px" fontWeight="700" color={ui.quiet} textTransform="uppercase" letterSpacing=".05em">Cég / kapcsolat</Text>
                <Text fontSize="10px" fontWeight="700" color={ui.quiet} textTransform="uppercase" letterSpacing=".05em">Érdeklődés</Text>
                <Text fontSize="10px" fontWeight="700" color={ui.quiet} textTransform="uppercase" letterSpacing=".05em">Státusz</Text>
                <Text fontSize="10px" fontWeight="700" color={ui.quiet} textTransform="uppercase" letterSpacing=".05em">Érkezett</Text>
              </Box>

              {!filtered.length ? (
                <EmptyState filtered={Boolean(search || filter !== "Összes státusz")} />
              ) : (
                filtered.map((lead) => {
                  const selected = lead.id === selectedId;
                  return (
                    <Box
                      key={lead.id}
                      as="button"
                      type="button"
                      onClick={() => loadDetail(lead.id)}
                      w="100%"
                      textAlign="left"
                      border="0"
                      borderBottom={`1px solid ${ui.border}`}
                      bg={selected ? ui.primarySoft : "#fff"}
                      px={{ base: 4, md: 5 }}
                      py={4}
                      cursor="pointer"
                      transition="140ms ease"
                      _hover={{ bg: selected ? ui.primarySoft : "#F9FAFB" }}
                    >
                      <Box display={{ base: "block", md: "grid" }} gridTemplateColumns="minmax(210px,1.2fr) minmax(150px,.8fr) 150px 150px" gap={4} alignItems="center">
                        <Box minW="0">
                          <Text fontSize="13px" fontWeight="730" color={ui.text} noOfLines={1}>{lead.company}</Text>
                          <Text mt={1} fontSize="11px" color={ui.muted} noOfLines={1}>{lead.name} · {lead.email}</Text>
                        </Box>
                        <Box mt={{ base: 3, md: 0 }} minW="0">
                          <Text fontSize="11px" fontWeight="600" color={ui.textSoft} noOfLines={1}>{lead.reason}</Text>
                          <Text mt={1} fontSize="10px" color={ui.quiet}>{lead.planned_start}</Text>
                        </Box>
                        <Box mt={{ base: 3, md: 0 }}><StatusBadge status={lead.status} compact /></Box>
                        <Box mt={{ base: 3, md: 0 }} display={{ base: "flex", md: "block" }} justifyContent="space-between" gap={3}>
                          <Text fontSize="11px" fontWeight="600" color={ui.textSoft}>{relativeDate(lead.created_at)}</Text>
                          <Text mt={{ base: 0, md: 1 }} fontSize="10px" color={ui.quiet}>{formatDate(lead.created_at, false)}</Text>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}

              <Box px={5} py={3.5} bg="#FAFBFC" display="flex" justifyContent="space-between" gap={3}>
                <Text fontSize="10px" color={ui.quiet}>{filtered.length} találat</Text>
                <Text fontSize="10px" color={ui.quiet}>Legfeljebb 250 lead betöltve</Text>
              </Box>
            </Box>

            <Box position={{ xl: "sticky" }} top={{ xl: "88px" }} bg={ui.panel} border={`1px solid ${ui.border}`} borderRadius="12px" overflow="hidden" minW="0">
              {!selectedLead ? (
                <Box py={16} px={6} textAlign="center">
                  <Box mx="auto" w="42px" h="42px" borderRadius="12px" bg="#F2F4F7" display="grid" placeItems="center" color={ui.quiet}>→</Box>
                  <Text mt={4} fontSize="13px" fontWeight="700">Válassz egy leadet</Text>
                  <Text mt={1.5} fontSize="12px" color={ui.muted}>A részletek és a műveletek itt jelennek meg.</Text>
                </Box>
              ) : (
                <>
                  <Box px={{ base: 5, md: 6 }} py={5} borderBottom={`1px solid ${ui.border}`}>
                    <Box display="flex" justifyContent="space-between" gap={4} alignItems="flex-start">
                      <Box minW="0">
                        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center"><StatusBadge status={selectedLead.status} compact /><NotificationBadge lead={selectedLead} /></Box>
                        <Text mt={3} fontSize="22px" fontWeight="760" letterSpacing="-.025em" noOfLines={2}>{selectedLead.company}</Text>
                        <Text mt={1} fontSize="12px" color={ui.muted}>{selectedLead.name} · {formatDate(selectedLead.created_at)}</Text>
                      </Box>
                      {detailLoading ? <Text fontSize="10px" color={ui.quiet}>Betöltés…</Text> : null}
                    </Box>

                    <Grid mt={4} templateColumns="1fr 1fr" gap={2}>
                      <Box as="a" href={`mailto:${selectedLead.email}`} h="38px" border={`1px solid ${ui.border}`} borderRadius="8px" display="grid" placeItems="center" fontSize="11px" fontWeight="700" color={ui.textSoft} bg="#fff">E-mail írása</Box>
                      <Box as="a" href={`tel:${selectedLead.phone}`} h="38px" border={`1px solid ${ui.border}`} borderRadius="8px" display="grid" placeItems="center" fontSize="11px" fontWeight="700" color={ui.textSoft} bg="#fff">Hívás</Box>
                    </Grid>
                  </Box>

                  <Box px={{ base: 5, md: 6 }} py={5} borderBottom={`1px solid ${ui.border}`}>
                    <Text fontSize="11px" fontWeight="750" color={ui.text}>Folyamat</Text>
                    <Grid mt={4} templateColumns={{ base: "1fr", sm: "1fr auto" }} gap={2}>
                      <select
                        value={selectedLead.status}
                        disabled={saving}
                        onChange={(event) => savePatch({ status: event.target.value }, "Státusz frissítve.")}
                        style={{ height: "42px", width: "100%", border: `1px solid ${ui.borderStrong}`, borderRadius: "8px", padding: "0 10px", outline: "none", fontSize: "12px", fontWeight: 650, color: ui.text, background: "#fff" }}
                      >
                        {LEAD_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                      <Box as="button" type="button" onClick={resendNotification} disabled={notifying} h="42px" px={4} border={`1px solid ${ui.primaryBorder}`} borderRadius="8px" bg={ui.primarySoft} color={ui.primary} fontSize="11px" fontWeight="700" cursor={notifying ? "wait" : "pointer"} whiteSpace="nowrap">
                        {notifying ? "Küldés…" : selectedLead.notification_status === "sent" ? "E-mail újraküldése" : "E-mail küldése"}
                      </Box>
                    </Grid>
                    {selectedLead.notification_error ? <Text mt={2} fontSize="10px" lineHeight="1.5" color={ui.danger}>{selectedLead.notification_error}</Text> : null}
                    {selectedLead.notification_sent_at ? <Text mt={2} fontSize="10px" color={ui.quiet}>Utolsó sikeres értesítés: {formatDate(selectedLead.notification_sent_at)}</Text> : null}
                  </Box>

                  <Box px={{ base: 5, md: 6 }} py={5} borderBottom={`1px solid ${ui.border}`}>
                    <Text fontSize="11px" fontWeight="750" color={ui.text}>Kapcsolat és vállalkozás</Text>
                    <Grid mt={4} templateColumns="1fr 1fr" gapX={5} gapY={5}>
                      <DetailField label="E-mail" value={selectedLead.email} href={`mailto:${selectedLead.email}`} />
                      <DetailField label="Telefon" value={selectedLead.phone} href={`tel:${selectedLead.phone}`} />
                      <DetailField label="Adószám" value={selectedLead.tax_id} />
                      <DetailField label="Forrás" value={selectedLead.source} />
                      <DetailField label="Bizonylat / hó" value={selectedLead.monthly_documents} />
                      <DetailField label="Bankszámlák" value={selectedLead.bank_accounts} />
                      <DetailField label="Munkavállalók" value={selectedLead.employees} />
                      <DetailField label="Külföldi / EU" value={selectedLead.foreign_transactions} />
                      <DetailField label="Érdeklődés oka" value={selectedLead.reason} />
                      <DetailField label="Tervezett kezdés" value={selectedLead.planned_start} />
                    </Grid>
                  </Box>

                  <Box px={{ base: 5, md: 6 }} py={5} borderBottom={`1px solid ${ui.border}`}>
                    <Text fontSize="11px" fontWeight="750" color={ui.text}>Érdeklődő üzenete</Text>
                    <Box mt={3} bg="#F8FAFC" border={`1px solid ${ui.border}`} borderRadius="9px" p={4}>
                      <Text whiteSpace="pre-wrap" fontSize="12px" lineHeight="1.7" color={ui.textSoft}>{selectedLead.message || "Nem adott meg külön megjegyzést."}</Text>
                    </Box>
                  </Box>

                  <Box px={{ base: 5, md: 6 }} py={5} borderBottom={`1px solid ${ui.border}`}>
                    <Box display="flex" justifyContent="space-between" gap={3} alignItems="center">
                      <Text fontSize="11px" fontWeight="750" color={ui.text}>Belső megjegyzés</Text>
                      <Text fontSize="10px" color={ui.quiet}>csak az adminban látható</Text>
                    </Box>
                    <textarea
                      value={noteDraft}
                      onChange={(event) => setNoteDraft(event.target.value)}
                      rows="5"
                      placeholder="Pl. visszahívás, ajánlati részletek, következő lépés…"
                      style={{ width: "100%", marginTop: "12px", border: `1px solid ${ui.borderStrong}`, borderRadius: "8px", padding: "11px 12px", resize: "vertical", minHeight: "110px", outline: "none", fontSize: "12px", lineHeight: 1.6, color: ui.text, background: "#fff" }}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                      <Box as="button" type="button" onClick={() => savePatch({ internalNote: noteDraft }, "Megjegyzés mentve.")} disabled={saving || noteDraft === (selectedLead.internal_note || "")} h="38px" px={4} border="0" borderRadius="8px" bg={noteDraft === (selectedLead.internal_note || "") ? "#E4E7EC" : ui.primary} color={noteDraft === (selectedLead.internal_note || "") ? ui.quiet : "#fff"} fontSize="11px" fontWeight="700" cursor={saving ? "wait" : "pointer"}>
                        {saving ? "Mentés…" : "Megjegyzés mentése"}
                      </Box>
                    </Box>
                  </Box>

                  <Box px={{ base: 5, md: 6 }} py={5}>
                    <Box display="flex" justifyContent="space-between" gap={3} alignItems="center" mb={4}>
                      <Text fontSize="11px" fontWeight="750" color={ui.text}>Aktivitás</Text>
                      <Text fontSize="10px" color={ui.quiet}>audit napló</Text>
                    </Box>
                    <Timeline events={events} loading={detailLoading} />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
