import React, { useEffect, useState, useRef } from 'react';
import './List.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { no_list_man, no_list_caution, list_click_ic } from '../components/Images';
import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Link, useLocation } from 'react-router-dom';
import CampingTypeFilter from '../components/CampingTypeFilter';
import CampingEnvironmentFilter from '../components/CampingEnvironmentFilter';
import AroundEnvironmentFilter from '../components/AroundEnvironmentFilter';

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
    const [showCampingEnvironment, setShowCampingEnvironment] = useState(false);
    const [showAroundEnvironment, setShowAroundEnvironment] = useState(false);
    const [selectedCampingTypes, setSelectedCampingTypes] = useState([]);
    const [selectedCampingEnvironments, setSelectedCampingEnvironments] = useState([]); 
    const [selectedAroundEnvironments, setSelectedAroundEnvironments] = useState([]); 
    const observer = useRef();
    const location = useLocation();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const itemsPerPage = 10;

    // 초기 로딩과 필터 설정
    useEffect(() => {
        if (location.state && location.state.selectedType) {
            const selectedType = location.state.selectedType;
            setSelectedCampingTypes([selectedType]); // Main.jsx에서 선택된 필터 적용
        } else {
            setSelectedCampingTypes([]); // 초기화
        }
        setPageNo(1); // 페이지 번호 초기화
    }, [location.state]);

    // 데이터 로딩 시 필터 적용
    useEffect(() => {
        fetchCampingData(pageNo);
    }, [pageNo, selectedCampingTypes, selectedCampingEnvironments, selectedAroundEnvironments]);

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

    const fetchCampingData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/basedList', {
                params: {
                    ServiceKey: CAMPING_API_KEY,
                    MobileOS: 'ETC',
                    MobileApp: 'AppTest',
                    _type: 'json',
                    numOfRows: 10,
                    pageNo: page
                }
            });
            
            if (response.data && response.data.response && response.data.response.body && response.data.response.body.items && response.data.response.body.items.item) {
                const newCamps = response.data.response.body.items.item;
                if (newCamps.length === 0) {
                    setHasMore(false);
                } else {
                    let uniqueCamps = [...new Map(newCamps.map(camp => [camp.contentId, camp])).values()];
                    
                    // 선택된 필터에 따라 캠핑장 필터링
                    if (selectedCampingTypes.length > 0) {
                        uniqueCamps = uniqueCamps.filter(camp => 
                            selectedCampingTypes.some(type => camp.induty && camp.induty.includes(campingTypeMapping[type]))
                        );
                    }
                    if (selectedCampingEnvironments.length > 0) {
                        uniqueCamps = uniqueCamps.filter(camp => 
                            selectedCampingEnvironments.some(env => camp.sbrsCl && camp.sbrsCl.includes(env))
                        );
                    }
                    if (selectedAroundEnvironments.length > 0) {
                        uniqueCamps = uniqueCamps.filter(camp => 
                            selectedAroundEnvironments.some(env => camp.posblFcltyCl && camp.posblFcltyCl.includes(env))
                        );
                    }

                    setCampList(prevCampList => page === 1 ? uniqueCamps : [...prevCampList, ...uniqueCamps]);
                    setFilteredCampList(prevFiltered => page === 1 ? uniqueCamps : [...prevFiltered, ...uniqueCamps]);
                    setDisplayedCampList(prevDisplayed => page === 1 ? uniqueCamps.slice(0, itemsPerPage) : [...prevDisplayed, ...uniqueCamps.slice(0, itemsPerPage)]);
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
        setShowCampingType(prevState => !prevState);
    };

    const handleCampingEnvironmentClick = () => {
        setShowCampingEnvironment(prevState => !prevState);
    };
    
    const handleAroundEnvironmentClick = () => {
        setShowAroundEnvironment(prevState => !prevState);
    };

    const handleCampingTypeSelect = (type) => {
        setSelectedCampingTypes((prevSelectedTypes) => {
            const isSelected = prevSelectedTypes.includes(type);
            const newSelectedTypes = isSelected
                ? prevSelectedTypes.filter((t) => t !== type)
                : [...prevSelectedTypes, type];
            setPageNo(1); // 새로운 필터 선택 시 페이지 번호 초기화
            return newSelectedTypes;
        });
    };

    const handleCampingEnvironmentSelect = (type) => { 
        setSelectedCampingEnvironments(prevSelectedEnvironments => {
            const newSelectedEnvironments = prevSelectedEnvironments.includes(type)
                ? prevSelectedEnvironments.filter(t => t !== type)
                : [...prevSelectedEnvironments, type];
            setPageNo(1); // 새로운 필터 선택 시 페이지 번호 초기화
            return newSelectedEnvironments;
        });
    };

    const handleAroundEnvironmentSelect = (type) => { 
        setSelectedAroundEnvironments(prevSelectedAroundEnvironments => {
            const newSelectedAroundEnvironments = prevSelectedAroundEnvironments.includes(type)
                ? prevSelectedAroundEnvironments.filter(t => t !== type)
                : [...prevSelectedAroundEnvironments, type];
            setPageNo(1); // 새로운 필터 선택 시 페이지 번호 초기화
            return newSelectedAroundEnvironments;
        });
    };

    const handleCampingTypeConfirm = () => {
        setShowCampingType(false);
        applyFilters();
    };

    const handleCampingEnvironmentConfirm = () => { 
        setShowCampingEnvironment(false);
        applyFilters();
    };

    const handleAroundEnvironmentConfirm = () => {
        setShowAroundEnvironment(false);
        applyFilters();
    };

    const applyFilters = () => {
        let filteredList = campList;

        if (selectedCampingTypes.length > 0) {
            filteredList = filteredList.filter(camp => {
                const includesSelectedTypes = selectedCampingTypes.some(type => 
                    type === '기타' 
                    ? !['야영장', '글램핑', '카라반'].some(excludedType => camp.induty.includes(excludedType))
                    : camp.induty.includes(campingTypeMapping[type])
                );
                return includesSelectedTypes;
            });
        }

        if (selectedCampingEnvironments.length > 0) {
            filteredList = filteredList.filter(camp => {
                const includesSelectedEnvironments = selectedCampingEnvironments.some(env => 
                    camp.sbrsCl && camp.sbrsCl.includes(env)
                );
                return includesSelectedEnvironments;
            });
        }
        
        if (selectedAroundEnvironments.length > 0) {
            filteredList = filteredList.filter(camp => {
                const includesSelectedAroundEnvironments = selectedAroundEnvironments.some(env => 
                    camp.posblFcltyCl && camp.posblFcltyCl.includes(env)
                );
                return includesSelectedAroundEnvironments;
            });
        }

        setFilteredCampList(filteredList);
        setDisplayedCampList(filteredList.slice(0, itemsPerPage));
        setSearchPageNo(1);
        setNoResults(filteredList.length === 0);
    };

    return (
        <div id="List">
            <Header/>
            <CampingTypeFilter 
                showCampingType={showCampingType}
                selectedCampingTypes={selectedCampingTypes}
                handleCampingTypeClick={handleCampingTypeClick}
                handleCampingTypeSelect={handleCampingTypeSelect}
                handleCampingTypeConfirm={handleCampingTypeConfirm}
            />
            <CampingEnvironmentFilter 
                showCampingEnvironment={showCampingEnvironment}
                selectedCampingEnvironments={selectedCampingEnvironments}
                handleCampingEnvironmentClick={handleCampingEnvironmentClick}
                handleCampingEnvironmentSelect={handleCampingEnvironmentSelect}
                handleCampingEnvironmentConfirm={handleCampingEnvironmentConfirm}
            />
            <AroundEnvironmentFilter 
                showAroundEnvironment={showAroundEnvironment}
                selectedAroundEnvironments={selectedAroundEnvironments}
                handleAroundEnvironmentClick={handleAroundEnvironmentClick}
                handleAroundEnvironmentSelect={handleAroundEnvironmentSelect}
                handleAroundEnvironmentConfirm={handleAroundEnvironmentConfirm}
            />
            <div className={`List_main ${showCampingType || showCampingEnvironment || showAroundEnvironment ? 'filter-active' : ''}`}>
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
                                        <div className="swiper-slide filter_box_bt_select" onClick={handleCampingEnvironmentClick}>
                                            {selectedCampingEnvironments.length > 0 ? selectedCampingEnvironments.join(', ') : '숙소 환경'}
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select" onClick={handleAroundEnvironmentClick}>
                                            {selectedAroundEnvironments.length > 0 ? selectedAroundEnvironments.join(', ') : '주변 환경'}
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
