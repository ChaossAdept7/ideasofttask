/**
 * Created by serj on 6/28/17.
 */
/**
 * Created by serj on 6/27/17.
 */

export function handleStateChange (inStateFieldName='userData',e){
    let {name , value} = e.target;
    this.setState({
        [inStateFieldName]:{
            ...this.state[inStateFieldName],
            [name]:value
        }
    });
}
