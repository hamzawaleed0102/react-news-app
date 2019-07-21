import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import { URL } from "../../../config";
import { Link } from "react-router-dom";
import styles from "./newslist.css";
import Button from "../Buttons/button";
import CardInfo from "../CardInfo/cardInfo";
export default class NewsList extends Component {
  state = {
    teams: [],
    items: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  componentDidMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if (this.state.teams.length < 1) {
      axios.get(`${URL}/teams`).then(response => {
        this.setState({ teams: response.data });
      });
    }
    //load more news
    axios
      .get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.end}`)
      .then(response => {
        this.setState({
          items: [...this.state.items, ...response.data],
          start,
          end
        });
      });
  };

  loadMore = () => {
    let newEnd = this.state.end + this.state.amount;
    this.request(this.state.end, newEnd);
  };

  renderNews = type => {
    let template = null;
    switch (type) {
      case "card":
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter
            }}
            timeout={500}
            key={i}
          >
            <div key={i}>
              <div className={styles.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo
                    teams={this.state.teams}
                    team={item.team}
                    date={item.date}
                  />
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;
      default:
        template = null;
    }
    return template;
  };

  render() {
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.renderNews(this.props.type)}
        </TransitionGroup>
        <Button
          type="loadmore"
          loadMore={() => this.loadMore()}
          cta="Load More News"
        />
      </div>
    );
  }
}
