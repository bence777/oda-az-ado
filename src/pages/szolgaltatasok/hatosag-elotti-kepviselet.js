export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/szolgaltatasok#kapcsolodo-feladatok",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
