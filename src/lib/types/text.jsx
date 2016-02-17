
define(function() {
  return {
    
    render: function() {
      if (this.props.readonly) {
        return <span>{this.props.value}</span>;
      } else {
        switch (this.props.options.textType) {
          case 'long':
            return <textarea>{this.</textarea>
            break;
          default:
            return <input value="{this.p">;
        }
      }
    schema: {
      type: 'string'
    }
  };
});
