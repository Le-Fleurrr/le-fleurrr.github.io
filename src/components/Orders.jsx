import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { Button } from "./ui/Button.tsx";

export const Orders = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
      setShowAddressForm(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Sifarişlərim</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Ünvanlar
        </h2>

        <ul className="space-y-2">
          {addresses.length === 0 ? (
            <li className="text-muted-foreground">Heç bir ünvan əlavə edilməyib.</li>
          ) : (
            addresses.map((addr, idx) => (
              <li
                key={idx}
                className="p-3 border border-border rounded-md bg-background"
              >
                {addr}
              </li>
            ))
          )}
        </ul>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Ünvan əlavə et
          </Button>
        </div>

        {showAddressForm && (
          <div className="mt-4 p-4 border border-border rounded-md bg-muted">
            <input
              type="text"
              placeholder="Yeni ünvanı daxil edin..."
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md mb-3"
            />
            <div className="flex gap-3">
              <Button variant="primary" size="sm" onClick={handleAddAddress}>
                Yadda saxla
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddressForm(false)}
              >
                Ləğv et
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Sifarişlər</h2>
        <p className="text-muted-foreground">Hazırda heç bir sifariş yoxdur.</p>
      </div>
    </div>
  );
};
