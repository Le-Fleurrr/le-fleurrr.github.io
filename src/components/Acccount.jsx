import { useState } from 'react';
import { useAuth } from '../contexts/authContext/index.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { 
  Package, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { Orders } from './Orders';

export function Account() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Ev',
      fullName: 'Nicat Məmmədov',
      phone: '+994 50 123 45 67',
      address: 'Yasamal rayonu, Nobel prospekti 15',
      city: 'Bakı',
      zipCode: 'AZ1000',
      isDefault: true
    }
  ]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    isDefault: false
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Çıxış zamanı xəta baş verdi');
    }
  };

  const handleAddAddress = () => {
    if (formData.name && formData.fullName && formData.address) {
      const newAddress = {
        id: Date.now(),
        ...formData
      };
      
      if (formData.isDefault) {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
      }
      
      setAddresses([...addresses, newAddress]);
      resetForm();
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setFormData(address);
    setShowAddressForm(true);
  };

  const handleUpdateAddress = () => {
    setAddresses(addresses.map(addr => 
      addr.id === editingAddress 
        ? { ...formData, id: editingAddress }
        : formData.isDefault 
          ? { ...addr, isDefault: false }
          : addr
    ));
    resetForm();
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Bu ünvanı silmək istədiyinizdən əminsiniz?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      isDefault: false
    });
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const tabs = [
    { id: 'orders', label: 'Sifarişlər', icon: <Package className="w-4 h-4" /> },
    { id: 'addresses', label: 'Ünvanlar', icon: <MapPin className="w-4 h-4" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Hesabım</h1>
          <p className="text-muted-foreground">
            {currentUser?.displayName || currentUser?.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Sifarişlərim</h2>
              <Orders />
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ünvanlarım</h2>
                {!showAddressForm && (
                  <Button onClick={() => setShowAddressForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Ünvan
                  </Button>
                )}
              </div>

              {showAddressForm && (
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingAddress ? 'Ünvanı Redaktə et' : 'Yeni Ünvan Əlavə et'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ünvan Adı (məs: Ev, İş)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="Ev"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="Nicat Məmmədov"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="+994 50 123 45 67"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Şəhər
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="Bakı"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Ünvan
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="Yasamal rayonu, Nobel prospekti 15"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Poçt Kodu
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
                        placeholder="AZ1000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                      className="w-4 h-4 rounded border-border"
                    />
                    <label htmlFor="isDefault" className="text-sm">
                      Əsas ünvan kimi təyin et
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                      disabled={!formData.name || !formData.fullName || !formData.address}
                    >
                      {editingAddress ? 'Yenilə' : 'Əlavə et'}
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Ləğv et
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`bg-card border rounded-lg p-4 ${
                      address.isDefault ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-1 inline-block">
                            Əsas ünvan
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="text-muted-foreground hover:text-primary transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-muted-foreground hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {address.fullName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {address.phone}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span>
                          {address.address}, {address.city}, {address.zipCode}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}

                {addresses.length === 0 && !showAddressForm && (
                  <div className="md:col-span-2 text-center py-12 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Hələ heç bir ünvan əlavə edilməyib</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profil Məlumatları</h2>
              
              <div className="bg-card border border-border rounded-lg p-6 max-w-2xl">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      {currentUser?.displayName || 'Əlavə edilməyib'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {currentUser?.email}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıxış
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}