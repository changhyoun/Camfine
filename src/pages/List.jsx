import './List.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect, useState, useRef } from 'react';
import { no_list_man, no_list_caution, list_click_ic } from '../components/Images';
import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Link, useLocation } from 'react-router-dom';

const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const campingTypeMapping = {
    '오토캠핑': '야영장',
    '글램핑': '글램핑',
    '카라반': '카라반',
};

function List({ campList, setCampList }) {
    const [filteredCampList, setFilteredCampList] = useState([]);
    const [displayedCampList, setDisplayedCampList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchPageNo, setSearchPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [showCampingType, setShowCampingType] = useState(false);
    const [selectedCampingTypes, setSelectedCampingTypes] = useState([]);
    const observer = useRef();
    const location = useLocation();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        if (location.state && location.state.selectedType) {
            const selectedType = location.state.selectedType;
            setSelectedCampingTypes([selectedType]);
        }

        fetchCampingData(pageNo, location.state?.selectedType);
    }, [location.state, pageNo]);

    useEffect(() => {
        new Swiper('.swiper-container3', {        
            slidesPerView: 'auto',
            touchRatio: 1,
            simulateTouch: true,
            followFinger: true,
            threshold: 20,
            spaceBetween: 15,
        });
    }, []);

    const fetchCampingData = async (page, filterType = null) => {
        setLoading(true);
        try {
            const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/basedList', {
                params: {
                    ServiceKey: CAMPING_API_KEY,
                    MobileOS: 'ETC',
                    MobileApp: 'AppTest',
                    _type: 'json',
                    numOfRows: 100,
                    pageNo: page
                }
            });
            
            if (response.data && response.data.response && response.data.response.body && response.data.response.body.items && response.data.response.body.items.item) {
                const newCamps = response.data.response.body.items.item;
                if (newCamps.length === 0) {
                    setHasMore(false);
                } else {
                    let uniqueCamps = [...new Map(newCamps.map(camp => [camp.contentId, camp])).values()];
                    
                    if (filterType) {
                        uniqueCamps = uniqueCamps.filter(camp => 
                            camp.induty && camp.induty.includes(campingTypeMapping[filterType])
                        );
                    }

                    setCampList(prevCampList => [...prevCampList, ...uniqueCamps]);
                    setFilteredCampList(prevFiltered => [...prevFiltered, ...uniqueCamps]);
                    setDisplayedCampList(prevDisplayed => [...prevDisplayed, ...uniqueCamps.slice(0, itemsPerPage)]);
                }
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error('데이터 가져오기 오류:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = () => {
        if (loading) return;
        if (searchTerm) {
            const nextSearchPageNo = searchPageNo + 1;
            const nextItems = filteredCampList.slice((nextSearchPageNo - 1) * itemsPerPage, nextSearchPageNo * itemsPerPage);
            setDisplayedCampList(prevDisplayedCampList => [...prevDisplayedCampList, ...nextItems]);
            setSearchPageNo(nextSearchPageNo);
        } else {
            setPageNo(prevPageNo => prevPageNo + 1);
        }
    };

    const lastCampElementRef = useRef();
    const lastCampElementObserver = useRef(
        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                loadMoreData();
            }
        })
    );

    useEffect(() => {
        if (lastCampElementRef.current) {
            lastCampElementObserver.current.observe(lastCampElementRef.current);
        }
        return () => {
            if (lastCampElementRef.current) {
                lastCampElementObserver.current.unobserve(lastCampElementRef.current);
            }
        };
    }, [displayedCampList, loading, hasMore]);

    const handleSearch = (e) => {
        e.preventDefault();
        const petFriendlyKeywords = ['애견', '애견 동반', '애견동반', '애견 동', '동반'];
        const isPetFriendlySearch = petFriendlyKeywords.some(keyword => searchTerm.includes(keyword));

        const filteredList = campList.filter(camp => {
            const fieldsToSearch = [
                'facltNm', 'addr1', 'addr2', 'intro', 'featureNm', 
                'doNm', 'sbrsCl', 'lineIntro', 'homepage', 'operDeCl', 
                'operPdCl', 'posblFcltyCl', 'posblFcltyEtc', 'facltDivNm', 'induty', 
                'lctCl', 'sigunguNm', 'themaEnvrnCl'
            ];
            const matchesSearchTerm = fieldsToSearch.some(field => camp[field] && camp[field].includes(searchTerm));
            if (isPetFriendlySearch) {
                return matchesSearchTerm && camp.animalCmgCl === '가능';
            }
            return matchesSearchTerm;
        });

        setFilteredCampList(filteredList);
        setDisplayedCampList(filteredList.slice(0, itemsPerPage));
        setSearchPageNo(1);
        setNoResults(filteredList.length === 0);
    };

    const reloadPage = () => {
        window.location.href = '/list';
    };

    const handleCampingTypeClick = () => {
        setShowCampingType(!showCampingType);
    };

    const handleCampingTypeSelect = (type) => {
        setSelectedCampingTypes(prevSelectedTypes => {
            const newSelectedTypes = prevSelectedTypes.includes(type) 
                ? prevSelectedTypes.filter(t => t !== type)
                : [...prevSelectedTypes, type];
            return newSelectedTypes;
        });
    };

    const handleCampingTypeConfirm = () => {
        setShowCampingType(false);
        if (selectedCampingTypes.length > 0) {
            const filteredList = campList.filter(camp => {
                const includesSelectedTypes = selectedCampingTypes.some(type => 
                    type === '기타' 
                    ? !['야영장', '글램핑', '카라반'].some(excludedType => camp.induty.includes(excludedType))
                    : camp.induty.includes(campingTypeMapping[type])
                );
                return includesSelectedTypes;
            });
            setFilteredCampList(filteredList);
            setDisplayedCampList(filteredList.slice(0, itemsPerPage));
            setSearchPageNo(1);
            setNoResults(filteredList.length === 0);
        } else {
            setFilteredCampList(campList);
            setDisplayedCampList(campList.slice(0, itemsPerPage));
            setNoResults(false);
        }
    };
    

    return (
        <div id="List">
            <Header/>
            <div className="List_main">
                <div className={`Camping_type ${showCampingType ? 'show' : ''}`}>
                    <button className="close" onClick={() => setShowCampingType(false)}>
                        <span className="material-symbols-rounded">
                            remove
                        </span>
                    </button>
                    <div className="Camping_type_warp">
                        <div className="Camping_type_warp_t">
                            숙소 유형 - ( 복수선택 가능 )
                        </div>
                        <div className="Camping_type_warp_m">
                            <ul>
                                {['오토캠핑', '글램핑', '카라반'].map(type => (
                                    <li
                                        key={type}
                                        className={selectedCampingTypes.includes(type) ? 'active' : ''}
                                        onClick={() => handleCampingTypeSelect(type)}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="Camping_type_warp_bt">
                            <button onClick={handleCampingTypeConfirm}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="List_main_warp">
                    <div className="filter_box">
                        <div className="filter_box_warp">

                            <div className="filter_box_item">
                                <div className="swiper-container3">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide filter_box_bt_select" onClick={handleCampingTypeClick}>
                                            {selectedCampingTypes.length > 0 ? selectedCampingTypes.join(', ') : '숙소 유형'}
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            지역
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            숙소 환경
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>                                            
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            주변 환경
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="camp_list">
                    <div className="camp_list_warp">
    {noResults ? (
        <div className="no_results">
            <div className="no_results_img_warp">
                <img src={no_list_man} alt="검색 결과 없음 이미지" />
                <img src={no_list_caution} alt="주의 이미지" />
            </div>
            <h3>검색결과가 없어요</h3>
            <button onClick={reloadPage} className="retry_button">
                다시 찾아보기
            </button>
        </div>
    ) : (
        displayedCampList.map((camp, index) => {
            const isDefaultImage = camp.firstImageUrl === "" || camp.firstImageUrl === null;
            return (
                <Link
                    to={{
                        pathname: `/camp/${camp.contentId}`,
                    }}
                    state={{ campList }}  // campList를 state로 전달
                    className={`camp_list_box ${hoveredIndex === index ? 'hovered' : ''}`}
                    key={index}
                    ref={index === displayedCampList.length - 1 ? lastCampElementRef : null}
                >
                    <img
                        src={isDefaultImage ? defaultImageUrl : camp.firstImageUrl}
                        alt="캠핑장 이미지"
                    />
                    <div className="camp_list_box_warp">
                        {isDefaultImage && (
                            <p className="none">대체 이미지</p>
                        )}
                        <div className="camp_info">
                            <h3>{camp.facltNm}</h3>
                            <p>{camp.addr1}</p>
                            <div className="camp_info_ck">
                                클릭시 상세 페이지로 이동됩니다.
                                <img src={list_click_ic} alt="list_click_ic" />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="camp_info_briefly"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        정보 간략히 보기
                        <span className="material-symbols-rounded">
                            keyboard_double_arrow_down
                        </span>
                        <div className="camp_info_details">
                            <b>ㆍ 편의 시설</b>
                            <ul>
                            {camp.sbrsCl ? camp.sbrsCl.split(',').map((item, index) => (
                                 <li className="info_item" key={index}> {item.trim()}</li>
                            )) : <li className="info_item">제공된 정보가 없습니다.</li>}
                            </ul>
                            <b>ㆍ 업종 정보</b>
                            <ul>
                            {camp.induty ? camp.induty.split(',').map((item, index) => (
                                <li className="info_item" key={index}>{item.trim()}</li>
                            )) : <li className="info_item">제공된 정보가 없습니다.</li>}<br/>
                            </ul>
                            
                            <b>ㆍ 애견 동반 여부</b>
                            <ul>
                               <li>{camp.animalCmgCl === '가능' ? '가능' : '불가능'}</li>
                            </ul>
                        </div>
                    </div>
                </Link>
            );
        })
    )}
    {loading && (
        <div className="load_list">
            <div className="loader"></div>
            캠핑장 데이터를 불러오는 중입니다...
        </div>
    )}
    {!hasMore && !noResults && (
        <div className="no_more_data">
            캠핑장이 없어요 😅
        </div>
    )}
</div>

</div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default List;
