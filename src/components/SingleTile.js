
function SingleTile(props) {
  return (
    <div className="tile" style={{backgroundColor: `hsl(${props.color}, 50%, 50%)`}} id={`${props.color}`}>
    </div>
  );
}

export default SingleTile;
