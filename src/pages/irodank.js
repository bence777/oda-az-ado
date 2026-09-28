export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/rolunk",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
