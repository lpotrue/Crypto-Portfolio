import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {fetchCurrencyData, fetchYourCoins} from '../actions/currency-data';
import SimpleAreaChart from './SimpleAreaChart';
import Search from './Search';
import {mapCurrency, editCoins} from '../actions/currency-data';
import Add from './Add';
import Decrement from './Decrement';
import Stocks from './Stocks';
import SimplePieChart1 from './SimplePieChart1';
import SimplePieChart from './SimplePieChart';
import moment from 'moment';
import { ScrollTo } from "react-scroll-to";

export class Dashboard extends React.Component{
    constructor() {
    super();
    this.state={
      coinData: []
    };
  }

  componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        
        this.props.dispatch(fetchCurrencyData());
        this.props.dispatch(fetchYourCoins());
      
       
    }
    componentWillReceiveProps(){
        
    }
 
    editCoin = (coin, num) => { 
        this.props.dispatch(editCoins(coin, num));
        console.log("coin", coin, num)
    }

    graphCoin = (coin) => {
       
        console.log(coin, this.props)
        var result = this.props.currency.filter(function( obj ) {
            return obj.name == coin.name;
        });
        result.forEach((coin) =>{ coin.price_usd = Number(coin.price_usd), coin.rank = Number(coin.rank), coin.percent_change_1h = Number(coin.percent_change_1h), coin.percent_change_7d = Number(coin.percent_change_7d), coin.percent_change_24h = Number(coin.percent_change_24h)})
         this.setState({
            coinData: [...result]
        });
        this.props.dispatch(mapCurrency(result));
       TopscrollTo()
    }


    render() {
      
        if (!this.props.loggedIn) {
           return <Redirect to="/" />;
        } 
    
      
    return (
        
        <div className="dashboard">
                    {/*<div id="hideMe">  
                        <div className="container">
                          <div className="feature-progress" aria-hidden="true">
                          <div className="feature-progress-ball-wrap">
                          <div className="feature-progress-ball"></div>
                          </div>

                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                        <div className="feature-progress-platform"></div>
                      </div>
                      </div>
                      <div className="space">
                       </div>
                     </div>
                        <div className="showMe">*/}
             <div className="showMe">
              <section className="stats">
                      <a href="#searching" className="arrow-container">
                        <span className="arrow"></span>
                      </a>

                  <span><h3 id="name">{this.props.selectedCoin.name} ({this.props.selectedCoin.symbol})</h3></span>
                  

                  <div id="rank">
                    <span id="statss">
                     <SimplePieChart1 id="map" coinData={this.props.coins} graphCoin={this.graphCoin}/>
                     <span>&#35;</span>{this.props.selectedCoin.rank}
                     </span>Rank</div>
                  
                   
                  <div id="rank1">
                  <span id="stats1">
                    <SimplePieChart id="map" coinData={this.props.coins} graphCoin={this.graphCoin}/>
                    <span>&#36;</span>{this.props.selectedCoin.price_usd}
                     </span> Price in USD</div>
                     
                    <div id="rank3" className="chart" data-percent="100">
                     <figcaption id="stats3" className="chart">{this.props.selectedCoin.percent_change_1h}<span>&#37;</span></figcaption> 
                     {/*<svg className="outer" cx="100" cy="50" r="40" stroke="black" stroke-width="3"/>*/}
                     <span id="stats3">1 Hour Change</span>
                   </div>
                   
                  <span id="together">
                      <div id="rank2" className="chart" data-percent="100">
                        <figcaption id="stats2" className="chart">{this.props.selectedCoin.percent_change_24h}<span>&#37;</span></figcaption>
                       {/*}<svg className="outer" cx="100" cy="50" r="40" stroke="black" stroke-width="3"/> */}    
                        <span id="stats2">24 Hour Change</span>
                      </div>

                      <div id="rank4" className="chart" data-percent="100">
                         <figcaption id="stats4" className="chart">{this.props.selectedCoin.percent_change_7d}<span>&#37;</span></figcaption>
                         {/*<svg className="outer" cx="100" cy="50" r="40" stroke="black" stroke-width="3"/>*/}
                         <span id="stats4">7 Day Change</span>
                       </div>
                    </span>

                    <div id="graph">
                        <SimpleAreaChart id="map" currency={this.props.currency} coinData={this.props.coins}/>
                    </div>
                    <h5>{this.props.selectedCoin.name} ({this.props.selectedCoin.symbol})</h5>
                   
                </section>
            

           <section id="searching">
              <div id="tabs">
               <h3 id="search">Search</h3>
                <span>&darr;</span>
                  
                <p>Type in a currency to track the progress</p>
              <div id="add-search">
                <Search currency={this.props.currency} graphCoin={this.graphCoin}/><Add selectedCoin={this.props.selectedCoin}/>
              </div>
           
            
            
            
              <h3 id="search">Portfolio</h3>
              <div id="mine">
              <Stocks yourCoins={this.props.yourCoins} edit={this.editCoin} graphCoin={this.graphCoin} selectedCoin={this.graphCoin}/><Decrement selectedCoin={this.props.decrementCoin}/>
            </div>
            </div>
          
          </section>
         </div>  
      </div>
 
                   
   
       
        
           );
         }       
       }


    function TopscrollTo() {
        if(window.scrollY!=0)
    {
    setTimeout(function() {
       window.scrollTo(0,window.scrollY-200);
        TopscrollTo();
    }, 80);
    }
  }  
    function scrollTo(element, to, duration) {
       
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}


const mapStateToProps = state => {
    const {currentUser} = state.auth;
    
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        coins: state.currency.coins,
        currency: state.currency.currency,
        selectedCoin: state.currency.selectedCoin,
        yourCoins: state.currency.yourCoins,
        count: state.counter.count,
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  
  }, dispatch)

export default connect(
    mapStateToProps, 

    )(Dashboard);


