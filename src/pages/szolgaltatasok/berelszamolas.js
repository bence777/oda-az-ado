export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/berszamfejtes",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
