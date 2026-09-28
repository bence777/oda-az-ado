export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/kapcsolat#ajanlatkeres",
      statusCode: 301,
    },
  };
}

export default function LegacyRedirectPage() {
  return null;
}
