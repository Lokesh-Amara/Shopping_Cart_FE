import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./containers/Header";
import Header2 from "./containers/Header2";
import ProductDetail from "./containers/ProductDetail";
import ProductListing from "./containers/ProductListing";
import Login from "./containers/Login";
import Register from "./containers/Register";
import MyCart from "./containers/MyCart";
import UserDetails from "./containers/UserDetails";
import BuyPage from "./containers/BuyPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Header2 />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/mycart" component={MyCart} />
          <Route exact path="/buy" component={BuyPage} />
          <Route exact path="/userdetails" component={UserDetails} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={ProductListing} />
          <Route exact path="/product/:productId" component={ProductDetail} />
          <Route> 404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
