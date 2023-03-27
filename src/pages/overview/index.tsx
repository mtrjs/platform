import { getStat } from '@services/overview';
import { useRequest } from 'ahooks';
import Map from './components/map';
import UA from './components/ua';
import Visit from './components/visit';

function Component() {
  const { data, loading } = useRequest(getStat);

  const { province = [], visit } = data || {};

  return (
    <div>
      <Visit data={visit} loading={loading} />
      {/* <UA data={}/> */}
      <Map style={{ marginTop: 20 }} data={province} />
    </div>
  );
}

export default Component;
