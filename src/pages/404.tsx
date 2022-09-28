import Content from '../components/Content';
import withUser from '../hoc/withUser';

function Page404() {
  return (
    <Content className="bg-white w-full h-[100vh] flex">
      <div className="scene x2 bg-gray-100 w-max p-8 rounded-3xl m-auto">
        <div className="tiles">
          {'404'.split('')
            .map((char, index) => ({ char, id: `${char}-${index}` }))
            .map(({ char, id }, index) => (
              <div key={id} className={`square s${index} bg-red-600`}>{char}</div>
            ))}
        </div>
        <span className="text-[55px] uppercase">Not Found</span>
      </div>
    </Content>
  );
}

export default withUser(Page404, false);
