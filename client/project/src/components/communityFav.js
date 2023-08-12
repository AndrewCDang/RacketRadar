import { useContext, useEffect, useMemo, useState } from "react"
import { RacketContext } from "../App"
import errorImage from '../images/error-racket.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



const CommunityFav = () => {

    const [state, dispatch] = useContext(RacketContext)
    const [ comFav, setComFav ] = useState()

    // const favList = useMemo(()=>{
    //     const favIds = state.favRackets
    //     const racketList = state.racketList
    //     const favArray = racketList.filter(racket => favIds.includes(racket._id))    
    //     return favArray
    // },[state.favRackets, state.racketList])

    const communityFavourites = async () => {
          try {
            const response = await fetch('/communityFavourites', {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Failed to get User Object');
            }
            const data = await response.json();
            setComFav(data);
          } catch (err) {
            console.log(err);

          }
        };

    useEffect(()=>{
        communityFavourites()
    },[])    



    return(
        <main className="main-community">
            <h2 className="com-title">Check out the <a> Top 10 Most Favourited</a> Rackets</h2>
            {comFav ? 
                <article className="com-fav-containers">
                    <div>
                        <section className="com-fav-column">            
                            {comFav.map((el,index)=>{
                                return(
                                    <section key={index} className="com-fav-item-container">
                                        <Link to={`/racket/${el.label}`} style={{ textDecoration: 'none' }}>
                                        <div className="reactLink">
                                            <img className="com-fav-img" src={el.url} alt={`${el.name}`} onError={(e) => e.target.src = errorImage} ></img>
                                            <div className="com-fav-content">
                                                <div className="com-fav-name-container">
                                                    <p className="com-fav-text">{el.name}</p>
                                                    <p className="com-fav-text">{el.label}</p>
                                                </div>
                                                <div className="com-fav-count-container">
                                                    <svg className="com-svg-heart" data-name="Layer 1" viewBox="0 0 666.67 597.43">
                                                        <path d="M80.87,331.56l191.21,205.83c33.08,35.61,89.44,35.61,122.52,0l191.21-205.83c63.38-68.22,63.38-178.84,0-247.06-63.38-68.22-166.14-68.22-229.52,0h0c-12.39,13.34-33.51,13.34-45.9,0h0c-63.38-68.22-166.14-68.22-229.52,0-63.38,68.22-63.38,178.84,0,247.06Z"/>
                                                    </svg>
                                                    <p className="com-fav-count-text">{el.favouritesCount}</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </Link>
                                        <div className="com-fav-award">
                                                {index == 0 ?
                                                <svg className="com-fav-award-svg" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M69.8203 29.1952L61.0704 56.1246H18.7499L10 29.1952L27.2632 38.9284L39.9102 15L52.5571 38.9284L69.8203 29.1952Z" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M59.9102 65H19.9102"  stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                : null
                                                }
                                                {index == 1 || index == 2 ?
                                                <svg className="com-fav-award-svg-2"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.87625 13.0953L4.70122 7.87653C4.44132 7.55166 4.31138 7.38922 4.21897 7.20834C4.13698 7.04787 4.07706 6.87705 4.04084 6.70052C4 6.50155 4 6.29354 4 5.8775V5.2C4 4.0799 4 3.51984 4.21799 3.09202C4.40973 2.71569 4.71569 2.40973 5.09202 2.21799C5.51984 2 6.0799 2 7.2 2H16.8C17.9201 2 18.4802 2 18.908 2.21799C19.2843 2.40973 19.5903 2.71569 19.782 3.09202C20 3.51984 20 4.0799 20 5.2V5.8775C20 6.29354 20 6.50155 19.9592 6.70052C19.9229 6.87705 19.863 7.04787 19.781 7.20834C19.6886 7.38922 19.5587 7.55166 19.2988 7.87652L15.1238 13.0953M5.00005 3L12.0001 12L19 3M15.5355 13.4645C17.4882 15.4171 17.4882 18.5829 15.5355 20.5355C13.5829 22.4882 10.4171 22.4882 8.46446 20.5355C6.51185 18.5829 6.51185 15.4171 8.46446 13.4645C10.4171 11.5118 13.5829 11.5118 15.5355 13.4645Z"  stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                : null
                                                }
                                                {index >= 3 ?
                                                <svg className="com-fav-award-svg-3" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.47 16.78C6.99258 16.78 5.54833 16.3419 4.31989 15.5211C3.09146 14.7003 2.13401 13.5336 1.56862 12.1686C1.00324 10.8037 0.855306 9.30171 1.14354 7.85267C1.43177 6.40364 2.14322 5.07261 3.18792 4.02791C4.23261 2.98321 5.56364 2.27177 7.01268 1.98353C8.46172 1.6953 9.96368 1.84323 11.3286 2.40862C12.6936 2.97401 13.8603 3.93145 14.6811 5.15989C15.5019 6.38833 15.94 7.83257 15.94 9.31C15.9374 11.2904 15.1495 13.1888 13.7492 14.5892C12.3488 15.9895 10.4504 16.7774 8.47 16.78ZM8.47 3.35C7.28332 3.35 6.12328 3.70189 5.13658 4.36118C4.14989 5.02047 3.38085 5.95754 2.92673 7.0539C2.4726 8.15026 2.35378 9.35666 2.58529 10.5205C2.8168 11.6844 3.38825 12.7535 4.22736 13.5926C5.06648 14.4318 6.13558 15.0032 7.29946 15.2347C8.46335 15.4662 9.66975 15.3474 10.7661 14.8933C11.8625 14.4392 12.7995 13.6701 13.4588 12.6834C14.1181 11.6967 14.47 10.5367 14.47 9.35C14.47 7.7587 13.8379 6.23258 12.7126 5.10736C11.5874 3.98214 10.0613 3.35 8.47 3.35Z"/>
                                                    <path d="M4.94001 22.15C4.79185 22.14 4.64961 22.088 4.53001 22C4.42467 21.9323 4.33822 21.839 4.27876 21.7289C4.21929 21.6187 4.18876 21.4952 4.19001 21.37V15C4.19001 14.8011 4.26903 14.6103 4.40968 14.4697C4.55033 14.329 4.7411 14.25 4.94001 14.25C5.13892 14.25 5.32969 14.329 5.47034 14.4697C5.61099 14.6103 5.69001 14.8011 5.69001 15V20.21L8.41001 19C8.59168 18.9178 8.79858 18.9111 8.98517 18.9814C9.17177 19.0518 9.32279 19.1933 9.40501 19.375C9.48723 19.5567 9.49391 19.7636 9.42358 19.9502C9.35325 20.1368 9.21168 20.2878 9.03001 20.37L5.25001 22.07C5.15303 22.117 5.04764 22.1442 4.94001 22.15Z"/>
                                                    <path d="M12.47 22.15C12.3638 22.1495 12.2587 22.1292 12.16 22.09L8.38001 20.39C8.19568 20.3038 8.05315 20.1479 7.98376 19.9566C7.9494 19.8619 7.93404 19.7614 7.93854 19.6607C7.94305 19.56 7.96733 19.4613 8.01001 19.37C8.05269 19.2787 8.11293 19.1968 8.18729 19.1288C8.26164 19.0608 8.34866 19.0081 8.44338 18.9738C8.63467 18.9044 8.84569 18.9138 9.03001 19L11.75 20.22V15C11.75 14.8011 11.829 14.6103 11.9697 14.4697C12.1103 14.329 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.329 13.0303 14.4697C13.171 14.6103 13.25 14.8011 13.25 15V21.4C13.2513 21.5252 13.2207 21.6487 13.1613 21.7589C13.1018 21.869 13.0154 21.9623 12.91 22.03C12.7786 22.1129 12.6254 22.1547 12.47 22.15Z"/>
                                                </svg>
                                                : null
                                                }
                                                <p className="com-fav-rank-text">{index+1}</p>
                                            </div>
                                    </section>
                                )
                            })}
                        </section>
                    </div>
                </article>
                : null
            }
        </main>
    )
}

export default CommunityFav