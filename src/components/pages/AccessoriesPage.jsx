import { Link } from 'react-router-dom';
import { AccessoriesSection } from '../AccessoriesSection';
import { useLanguage } from '../LanguageContext.jsx';
import { usePageTitle } from '../usePageTitle.js';

// Standalone page for /accessories — previously this route pointed at the
// Accessories data array, which crashed when rendered as a component.
const AccessoriesPage = () => {
  const { t } = useLanguage();
  usePageTitle(t.accessoriesTitle);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-12">
        <Link to="/" className="text-primary hover:underline inline-block">
          ← {t.backHome}
        </Link>
      </div>
      <AccessoriesSection />
    </div>
  );
};

export default AccessoriesPage;
