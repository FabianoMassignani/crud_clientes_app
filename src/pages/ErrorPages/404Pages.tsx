import { NotFound } from '../../components/Error/404';
import { PageLayout } from '../layouts/PageLayout';

const NotFoundPage = () => {
  return (
    <PageLayout>
      <NotFound />
    </PageLayout>
  );
};

export default NotFoundPage;
