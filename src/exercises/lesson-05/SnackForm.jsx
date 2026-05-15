import { useEffect, useState } from 'react';
import styles from './SnackForm.module.css';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    rating: false,
  });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(String(editingSnack.rating));
    } else {
      setName('');
      setRating('');
    }

    setTouched({ name: false, rating: false });
  }, [editingSnack]);

  function validateName() {
    return name.trim() !== '';
  }

  function validateRating() {
    const numericRating = Number(rating);
    return rating !== '' && numericRating >= 1 && numericRating <= 5;
  }

  function getNameError() {
    if (!touched.name || validateName()) return '';
    return 'Snack name is required';
  }

  function getRatingError() {
    if (!touched.rating || validateRating()) return '';
    return 'Please enter a rating from 1 to 5';
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isRatingValid = validateRating();

    if (!isNameValid || !isRatingValid) {
      setTouched({ name: true, rating: true });
      return;
    }

    const trimmedName = name.trim();
    if (editingSnack) {
      updateSnack(editingSnack.id, trimmedName, rating);
    } else {
      addSnack(trimmedName, rating);
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {editingSnack ? 'Edit Snack' : 'Add a New Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label htmlFor="name" className={styles['field-label']}>
          Snack Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={`${styles['field-input']} ${getNameError() ? styles['input-error'] : ''}`}
        />
        {getNameError() && <div className={styles.error}>{getNameError()}</div>}
      </div>

      <div className={styles['field-container']}>
        <label htmlFor="rating" className={styles['field-label']}>
          Rating (1-5)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          className={`${styles['field-input']} ${getRatingError() ? styles['input-error'] : ''}`}
        />
        {getRatingError() && (
          <div className={styles.error}>{getRatingError()}</div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {editingSnack ? 'Update Snack' : 'Add Snack'}
        </button>

        {editingSnack && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
