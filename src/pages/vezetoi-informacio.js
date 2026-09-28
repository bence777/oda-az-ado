import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";
import { serviceDetails } from "@/data/serviceDetails";

export default function VezetoiInformacioPage() {
  return <ServiceDetailPage service={serviceDetails["vezetoi-informacio"]} />;
}
