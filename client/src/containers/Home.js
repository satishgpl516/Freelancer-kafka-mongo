import React,{Component} from 'react';
//import ReactDOM from 'react-dom';
//import {BrowserRouter, Route, Switch} from 'react-router-dom';
import  {Link } from "react-router-dom";
 import Login from "./Login";
// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
import Header from "./Header";

class Home extends  Component{

    render(){
        return (
            <div>
                {/*<h1>Home</h1>*/}
                <Header/>
                <section className="HomeHero-section">
                    <div className="HomeHero">
                        <div className="HeroSlider">
                            <div className="HeroSlider-slide HeroSlider-slide--01 ">
                                <div class="HeroSlider-slide-priceContainer Container">
                                    <div data-desc="price" class="HeroSlider-price">
                         <span class="HeroSlider-price-text">
                              This <strong>Mobile App Design</strong> cost
                           </span>
                                        <span class="HeroSlider-price-value">
                             $150
                           </span>
                                    </div>
                                </div>

                            </div>
                            <div class="Container HeroSlider-section-inner">
                                <div class="HeroSlider-content-inner">
                                    <h1 class="HeroSlider-heading">Hire expert freelancers for any job, online</h1>
                                    <p class="HeroSlider-desc">
                                        Millions of small businesses use Freelancer to turn their ideas into reality.
                                    </p>
                                    <div class="HomeHero-actionList">
                                        <li class="HomeHero-action">
                                            <a href="/post-project"  class="btn HomeHero-btn btn-primary">
                                                <span class="HomeHero-btnText">I want to Hire</span>
                                            </a>
                                        </li>
                                        <li class="HomeHero-action">
                                            <a href="/signup"  class="btn btn-plain-alt HomeHero-btn">
                                                <span class="HomeHero-btnText">I want to Work</span>
                                            </a>
                                        </li>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </section>


            </div>
        );

    }
}

export default  Home;


