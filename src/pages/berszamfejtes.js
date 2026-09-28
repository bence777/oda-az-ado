import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";
import { serviceDetails } from "@/data/serviceDetails";

export default function BerszamfejtesPage() {
  return <ServiceDetailPage service={serviceDetails.berszamfejtes} />;
}
