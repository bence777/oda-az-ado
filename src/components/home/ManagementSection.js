import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { chartData } from "../../data/home";
import {
  CHART_HEIGHT,
  CHART_WIDTH,
  chartAreaPath,
  chartLinePath,
  chartPoints,
} from "../../lib/homeChart";

export default function ManagementSection() {
  const dashboardRef = useRef(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [activeChartIndex, setActiveChartIndex] = useState(null);

  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setChartVisible(true);
      return;
    }

    const rect = dashboard.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setChartVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setChartVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    observer.observe(dashboard);
    return () => observer.disconnect();
  }, []);

  const handleChartPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    const index = Math.round(ratio * (chartData.length - 1));
    setActiveChartIndex((current) => (current === index ? current : index));
  };

  const activePoint =
    activeChartIndex === null ? null : chartPoints[activeChartIndex];

  return (
    <Box
      id="vezetoi-informacio"
      position="relative"
      bg={design.colors.ink}
      color="#FFFFFF"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="1px"
        bg="rgba(177,138,85,.38)"
      />

      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          minH={{ base: "auto", lg: "820px" }}
          templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }}
          gap={{ base: 16, lg: 16, xl: 22 }}
          alignItems="center"
          py={{ base: 24, md: 30, lg: 24 }}
        >
          <Box maxW="520px">
            <Heading
              as="h2"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "43px", sm: "50px", md: "62px", lg: "68px" }}
              fontWeight="500"
              lineHeight=".98"
              letterSpacing="-0.06em"
              color="#FFFFFF"
            >
              Nem elég tudni,
              <br />
              mi történt.
            </Heading>

            <Text
              mt={9}
              fontSize={{ base: "18px", md: "20px" }}
              lineHeight="1.5"
              letterSpacing="-0.025em"
              color={design.colors.champagne}
            >
              Azt is látni kell,
              <br />
              mi következik.
            </Text>

            <Text
              mt={6}
              maxW="420px"
              fontSize="15px"
              lineHeight="1.75"
              color="rgba(255,255,255,.52)"
            >
              Vezetői riportok, eredménykimutatások, adókalkuláció és
              döntéstámogatás — a könyvelési adatok érthetőbb formában.
            </Text>

            <Flex mt={11} align="center" gap={5}>
              <Box w="42px" h="2px" bg={design.colors.champagne} />
              <Text fontSize="11px" color="rgba(255,255,255,.62)">
                Adatokból érthető információ.
              </Text>
            </Flex>
          </Box>

          <Box ref={dashboardRef} w="100%" maxW={{ base: "760px", lg: "none" }}>
            <Box
              border="1px solid rgba(255,255,255,.12)"
              bg="rgba(255,255,255,.025)"
            >
              <Flex
                minH="76px"
                px={{ base: 5, md: 7 }}
                align="center"
                justify="space-between"
                borderBottom="1px solid rgba(255,255,255,.09)"
              >
                <Box>
                  <Text
                    fontSize="13px"
                    fontWeight="600"
                    color="rgba(255,255,255,.9)"
                  >
                    Pénzügyi áttekintés
                  </Text>
                  <Text mt="3px" fontSize="10px" color="rgba(255,255,255,.35)">
                    Szemléltető adatok
                  </Text>
                </Box>

                <Flex align="center" gap={2}>
                  <Box
                    w="7px"
                    h="7px"
                    borderRadius="50%"
                    bg={design.colors.champagne}
                    boxShadow="0 0 0 5px rgba(177,138,85,.10)"
                  />
                  <Text fontSize="10px" color="rgba(255,255,255,.48)">
                    Aktuális időszak
                  </Text>
                </Flex>
              </Flex>

              <Grid
                templateColumns={{ base: "1fr 1fr", md: "repeat(3,1fr)" }}
                borderBottom="1px solid rgba(255,255,255,.09)"
              >
                {[
                  ["Árbevétel", "48,2 M", "Ft · tárgyidőszak"],
                  ["Eredmény", "8,6 M", "Ft · becsült"],
                  ["Várható adófizetés", "2,1 M", "Ft · előrejelzés"],
                ].map((metric, index) => (
                  <Box
                    key={metric[0]}
                    gridColumn={{ base: index === 2 ? "1 / -1" : "auto", md: "auto" }}
                    px={{ base: 5, md: 7 }}
                    py={7}
                    borderRight={{
                      base:
                        index === 0
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                      md:
                        index < 2
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                    }}
                    borderTop={{
                      base:
                        index === 2
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                      md: "none",
                    }}
                  >
                    <Text fontSize="10px" color="rgba(255,255,255,.38)">
                      {metric[0]}
                    </Text>
                    <Text
                      mt={3}
                      fontSize={{ base: "23px", md: "27px", xl: "30px" }}
                      fontWeight="500"
                      letterSpacing="-0.045em"
                      color="#FFFFFF"
                    >
                      {metric[1]}
                    </Text>
                    <Text
                      mt={2}
                      fontSize="10px"
                      color={
                        index === 2
                          ? design.colors.champagne
                          : "rgba(255,255,255,.4)"
                      }
                    >
                      {metric[2]}
                    </Text>
                  </Box>
                ))}
              </Grid>

              <Box px={{ base: 5, md: 7 }} pt={8} pb={6}>
                <Flex justify="space-between" align="center" mb={8}>
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="550"
                      color="rgba(255,255,255,.84)"
                    >
                      Árbevétel alakulása
                    </Text>
                    <Text mt="4px" fontSize="9px" color="rgba(255,255,255,.32)">
                      Mozgasd a kurzort a diagramon
                    </Text>
                  </Box>

                  <Flex align="center" gap={2}>
                    <Box w="18px" h="2px" bg={design.colors.champagne} />
                    <Text fontSize="9px" color="rgba(255,255,255,.4)">
                      Árbevétel
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  position="relative"
                  h={{ base: "220px", md: "290px" }}
                  cursor="crosshair"
                  touchAction="pan-y"
                  onPointerMove={handleChartPointer}
                  onPointerDown={handleChartPointer}
                  onPointerLeave={() => setActiveChartIndex(null)}
                >
                  <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    pointerEvents="none"
                  >
                    {[0, 1, 2, 3, 4].map((line) => (
                      <Box
                        key={line}
                        h="1px"
                        bg="rgba(255,255,255,.065)"
                      />
                    ))}
                  </Box>

                  {activePoint && (
                    <Box
                      position="absolute"
                      zIndex="5"
                      left={`${(activePoint.x / CHART_WIDTH) * 100}%`}
                      top={`${(activePoint.y / CHART_HEIGHT) * 100}%`}
                      transform={
                        activeChartIndex < 2
                          ? "translate(8px,-115%)"
                          : activeChartIndex > chartData.length - 3
                            ? "translate(calc(-100% - 8px),-115%)"
                            : "translate(-50%,-115%)"
                      }
                      minW="124px"
                      px={3}
                      py={2.5}
                      bg="#FBF8F2"
                      color={design.colors.ink}
                      pointerEvents="none"
                      boxShadow="0 14px 40px rgba(0,0,0,.22)"
                    >
                      <Text fontSize="9px" color={design.colors.muted}>
                        {chartData[activeChartIndex].label}
                      </Text>
                      <Text
                        mt="2px"
                        fontSize="14px"
                        fontWeight="650"
                        letterSpacing="-0.03em"
                      >
                        {chartData[activeChartIndex].value
                          .toFixed(1)
                          .replace(".", ",")} M Ft
                      </Text>
                    </Box>
                  )}

                  <Box
                    as="svg"
                    position="absolute"
                    inset="0"
                    w="100%"
                    h="100%"
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    preserveAspectRatio="none"
                    overflow="visible"
                  >
                    <defs>
                      <linearGradient id="financeAreaGold" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#B18A55"
                          stopOpacity=".2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#B18A55"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d={chartAreaPath}
                      fill="url(#financeAreaGold)"
                      opacity={chartVisible ? 1 : 0}
                      style={{ transition: "opacity 1s ease .35s" }}
                    />

                    {activePoint && (
                      <line
                        x1={activePoint.x}
                        x2={activePoint.x}
                        y1="0"
                        y2={CHART_HEIGHT}
                        stroke="rgba(255,255,255,.18)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    <path
                      d={chartLinePath}
                      fill="none"
                      stroke={design.colors.champagne}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      pathLength="100"
                      strokeDasharray="100"
                      strokeDashoffset={chartVisible ? "0" : "100"}
                      style={{
                        transition:
                          "stroke-dashoffset 1.65s cubic-bezier(.16,1,.3,1)",
                      }}
                    />

                    {chartPoints.map((point, index) => (
                      <circle
                        key={point.label}
                        cx={point.x}
                        cy={point.y}
                        r={activeChartIndex === index ? 6 : 2.7}
                        fill={
                          activeChartIndex === index
                            ? "#FBF8F2"
                            : design.colors.champagne
                        }
                        stroke={design.colors.champagne}
                        strokeWidth={activeChartIndex === index ? 3 : 0}
                        opacity={chartVisible ? 1 : 0}
                        style={{
                          transition: `opacity .35s ease ${0.45 + index * 0.055}s`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Flex mt={4} justify="space-between">
                  {[0, 2, 4, 6, 8, 11].map((index) => (
                    <Text
                      key={chartData[index].label}
                      fontSize="8px"
                      color="rgba(255,255,255,.3)"
                    >
                      {chartData[index].label}
                    </Text>
                  ))}
                </Flex>

                <Grid
                  mt={8}
                  pt={6}
                  borderTop="1px solid rgba(255,255,255,.09)"
                  templateColumns={{
                    base: "1fr 1fr",
                    md: "repeat(5, minmax(0, 1fr))",
                  }}
                  gap={{ base: 5, md: 0 }}
                >
                  {[
                    ["Követelések", "6,4 M Ft", "vevőállomány"],
                    ["Kötelezettségek", "4,9 M Ft", "szállítók + adók"],
                    ["Likviditási terv", "+7,8 M Ft", "30 napos kitekintés"],
                    ["Cash-flow", "+1,6 M Ft", "havi egyenleg"],
                    ["Várható pénzmozgások", "12,7 M Ft", "következő 30 nap"],
                  ].map((item, index) => (
                    <Box
                      key={item[0]}
                      minW={0}
                      pr={{ base: 0, md: index < 4 ? 4 : 0 }}
                      pl={{ base: 0, md: index > 0 ? 4 : 0 }}
                      borderLeft={{
                        base: "none",
                        md:
                          index > 0
                            ? "1px solid rgba(255,255,255,.08)"
                            : "none",
                      }}
                      gridColumn={{
                        base: index === 4 ? "1 / -1" : "auto",
                        md: "auto",
                      }}
                    >
                      <Text
                        fontSize="9px"
                        lineHeight="1.35"
                        color="rgba(255,255,255,.38)"
                      >
                        {item[0]}
                      </Text>
                      <Text
                        mt={2}
                        fontSize={{ base: "15px", md: "14px", xl: "15px" }}
                        fontWeight="600"
                        letterSpacing="-0.025em"
                        color="#FFFFFF"
                      >
                        {item[1]}
                      </Text>
                      <Text
                        mt={1.5}
                        fontSize="8px"
                        lineHeight="1.4"
                        color={
                          index === 2 || index === 3
                            ? design.colors.champagne
                            : "rgba(255,255,255,.3)"
                        }
                      >
                        {item[2]}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Text
              mt={4}
              textAlign="right"
              fontSize="9px"
              color="rgba(255,255,255,.27)"
            >
              A megjelenített értékek szemléltető példaadatok.
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   ACCOUNTANT SWITCH
========================================================= */

