import React, { PropTypes } from 'react';

// by placing prop types in the signature, it can be easily seen what the component requires
const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={ wrapperClass }>
      <label htmlFor={ name }>{ label }</label>
      <div className="field">
        <select
          name={ name }
          className="form-control"
          value={ value }
          onChange={ onChange }>
          <option value="">{ defaultOption }</option>
          { options.map((option) => {
            return <option key={ option.value } value={ option.value}>{ option.text }</option>;
          })}
        </select>
        { error && <div className="alert alert-danger">{error}</div> }
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
