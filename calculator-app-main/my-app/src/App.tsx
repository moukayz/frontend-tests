const MultiSwitchButton = () => {
  return (
    <div className="border flex flex-col w-14">
      <div className="border flex p-1 gap-2">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>

      <div className="border"></div>
    </div>
  );
};

function App() {
  return (
    <div>
      <MultiSwitchButton />
    </div>
  );
}

export default App;
