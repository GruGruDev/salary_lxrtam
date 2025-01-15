import {} from 'react';
import PropTypes from 'prop-types';
export const Button = ({title, onClick}) =>  {
    return (
    <>
        <button onClick={onClick} className="btn-mb bg-gradient-to-r from-yellow-500 to-slate-300 text-white font-bold py-3 px-16 rounded-3xl">{title}</button>
    </>
)
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };
