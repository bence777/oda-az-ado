export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/adotanacsadas",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
