const ListHead = () => (
    <header>
    <h1>A Camper Leaderboard</h1>
    <ul>
      <li>Raking</li>
      <li>Name</li>
      <li>Points in past 30 days</li>
      <li>All time points</li>
    </ul>
    </header>
)
class Leader extends React.Component {
  render(){  
    var recentData = this.props.recentData;
    return (
      <div className = {this.props.index%2 === 0?"row":"row white"}>
        <div className = "cell">{this.props.index + 1}</div>
        <div className = "cell"><img src = {recentData.img} />{recentData.username}</div>
        <div className = "cell">{recentData.recent}</div>
        <div className = "cell">{recentData.alltime}</div>
      </div>
    );
  }
}
class LeaderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      listData : [],
      isRecent: true
    };
  }
  componentWillMount(){
    // alert('asdf');
  }
  componentDidMount(){
    // alert('asdfsadf');
    this.fetchRecentData();
  }
  fetchAllData(){
    $.ajax({
     url:'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      type:'GET', //GET
      async:true,    //或false,是否异步
      data:{},
      timeout:5000,    //超时时间
      dataType:'json',
      beforeSend:function(xhr){
        // console.log('发送前')
      },
      success:function(data,textStatus,jqXHR){
        console.log('success:',data[0])
        this.setState({
          listData: data
        });
      }.bind(this),
      error:function(xhr,textStatus){
        console.log('错误:',xhr)
      },
      complete:function(){
        // console.log('结束')
      }
    });
  }
  fetchRecentData(){
    $.ajax({
     url:'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      type:'GET', //GET
      async:true,    //或false,是否异步
      data:{},
      timeout:5000,    //超时时间
      dataType:'json',
      beforeSend:function(xhr){
        // console.log('发送前')
      },
      success:function(data,textStatus,jqXHR){
        this.setState({
          listData: data
        });
      }.bind(this),
      error:function(xhr,textStatus){
        console.log('错误:',xhr)
      },
      complete:function(){
        // console.log('结束')
      }
    });
  }
  changeData(){
    // alert('sdfasdf');
    console.log('state::::',this.state.isRecent);
    if(this.state.isRecent){
       this.fetchAllData();
      this.setState({isRecent:false});
    } else {
       this.fetchRecentData();
       this.setState({isRecent:true});
    }
  }
  render() {
    let list = this.state.listData.map(function(item, index){
      return (
              <Leader recentData={item} index={index}/>);
    });
    return (
      <div>
        <ListHead isRecent={this.state.isRecent}/>
        <button onClick={this.changeData.bind(this)}>toggle</button>
        {list}
      </div> 
    );
  }
}

ReactDOM.render(
  <div className = "container">
    <LeaderList />
  </div>,
  document.getElementById('app')
);