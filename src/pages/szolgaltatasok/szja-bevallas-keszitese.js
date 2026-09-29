export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/szolgaltatasok#szja-bevallas",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
