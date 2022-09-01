import Content from '../components/Content';

export default function Page404() {
  return (
    <Content className="bg-gray-100 w-full h-[100vh] flex">
      <div className="scene x2 bg-white w-max p-8 rounded-3xl m-auto">
        <div className="tiles">
          {'404'.split('').map((char, index) => (
            <div className={`square s${index} bg-red-600`}>{char}</div>
          ))}
        </div>
        <span className="text-[55px] uppercase">Not Found</span>
      </div>
    </Content>
  );
}
