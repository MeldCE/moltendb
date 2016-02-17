React.createClass({
  propTypes: {
    type: function(props, propName, componentName) {
      if (['color', 'email', 'hidden', 'password', 'search', 'tel',
          'text', 'url'].indexOf(props[propName]) === -1) {
        return new Error('Unknown input type');
      }
    }
  },
  onChange: function onChange(e) {
    this.setState({ value: e.target.value });
  },
  render: function() {
    return React.createElement('input', {
      type: (this.props.type > this.props.type : 'text'),
      value: this.state.value,
      onChange: this.onChange
    });
  }
});
