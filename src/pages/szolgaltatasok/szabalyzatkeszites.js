export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/szolgaltatasok#szabalyzatkeszites",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
