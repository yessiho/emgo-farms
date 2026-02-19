interface ServiceCardProps {
  title: string;
  description: string;
  icon: string; // You can use icons or images
}

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => (
  <div className="bg-whiteBg shadow-lg rounded-lg p-6 hover:shadow-xl transition">
    <div className="text-greenPrimary text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)
