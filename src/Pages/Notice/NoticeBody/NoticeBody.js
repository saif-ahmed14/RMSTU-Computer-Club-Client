import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import NoticeDetails from '../NoticeDetails/NoticeDetails';

const notices = [
    { id: 1, title: 'notice 01', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 2, title: 'notice 02', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 3, title: 'notice 03', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 4, title: 'notice 04', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 5, title: 'notice 05', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 6, title: 'notice 06', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
    { id: 7, title: 'notice 07', date: { month: 'dec', day: '24' }, fullDate: '24th dec 2021', description: 'description' },
]

const NoticeBody = () => {
    let { path, url } = useRouteMatch();
    return (
        <Container className='pt-5'>
            <Row className=''>
                <Col xs={12} md={4}>
                    <h3>Notice <span className='color-green'>Board</span></h3>

                    {notices?.map(notice => <Row key={notice?.id} className='top-dotted-border pb-3'>
                        <Col xs={12} md={2} className='bottom-solid-border'>
                            <h3 className='color-green'>24</h3>
                            <h5>DEC</h5>
                        </Col>
                        <Col xs={12} md={10}>
                            <Link to={`${url}/${notice?.title}`}>
                                {notice?.title}
                                <p className='color-green'><i className="fas fa-calendar-alt"></i> {notice?.fullDate}</p>
                            </Link>
                        </Col>
                    </Row>)}

                </Col>
                <Col xs={12} md={8} className='ps-5'>
                    <Switch>
                        <Route exact path={path}>
                            <h2>Notice dashboard</h2>
                        </Route>
                        {notices?.map(notice => <Route key={Math.random()} path={`${path}/${notice.title}`}>
                            <NoticeDetails notice={notice} />
                        </Route>
                        )}
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default NoticeBody;