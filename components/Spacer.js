const Spacer = (props) => {
  let { bottomVal, topVal } = props

  return (<div style={{paddingBottom: bottomVal, paddingTop: topVal}}/>)
}
export default Spacer;