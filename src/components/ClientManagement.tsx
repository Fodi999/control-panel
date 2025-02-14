"use client";

interface Client {
  id: number;
  name: string;
  // Добавьте другие свойства клиента при необходимости
}

interface ClientManagementProps {
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

export function ClientManagement({ clients, setClients }: ClientManagementProps) {
  const handleClearClients = () => {
    setClients([]);
  };

  return (
    <div>
      <h2>Client Management Panel</h2>
      <p>Количество клиентов: {clients.length}</p>
      <button
        onClick={handleClearClients}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Очистить клиентов
      </button>
      {/* Дополнительная логика управления клиентами */}
    </div>
  );
}