import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";
import { serviceDetails } from "@/data/serviceDetails";

export default function KonyvelesPage() {
  return <ServiceDetailPage service={serviceDetails.konyveles} />;
}
