import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

class TextInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool
  };

  static defaultProps = {
    helperText: '',
    error: false,
    required: false
  };

  render() {
    const { id, label, helperText, error, required, ...rest } = this.props;

    return (
      <FormControl aria-describedby={`${id}-helper-text`} error={error} required={required}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input id={id} {...rest} />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
}

export default TextInput;
