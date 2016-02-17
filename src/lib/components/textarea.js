React.createClass({
  onChange: function onChange(e) {
    this.setState({ value: e.target.value });
  },
  render: function() {
    return React.createElement('textarea', {
      onChange: this.onChange
    }, this.state.value);
  }
});
