import React from 'react';

//import { Link } from 'react-router-dom';

export default function CocktailList({ Images, loading }) {
  if (loading) {
    return <h2 className='section-title'>Loading...</h2>;
  }
  if (Images.length < 1) {
    return (
      <h2 className='section-title'>no Images matched your search criteria</h2>
    );
  }
  const download = ({ item }) => {
    var element = document.createElement('a');
    var file = new Blob([item], { type: 'image/*' });
    element.href = URL.createObjectURL(file);

    //element.click();
  };

  return (
    <section className='section'>
      <h2 className='section-title'>Search Result Images</h2>

      <div className='cocktails-center'>
        {Images.map((item) => {
          return (
            <article className='cocktail'>
              <div className='img-container'>
                <img src={item} alt='#' />
              </div>
              <div>
                <a href={item} download onClick={() => download({ item })}>
                  <i className='fa fa-download' />
                  download
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
