export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/szolgaltatasok#hatosagi-kepviselet",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
