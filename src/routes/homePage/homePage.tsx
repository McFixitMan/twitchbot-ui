import * as React from 'react';

import { Button, ButtonProps, Col, ColProps, Row } from 'antd';

import { Fade } from 'react-awesome-reveal';
import { PageWrapper } from '../../components/pageWrapper';
import { routes } from '../appRoutes';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = (props) => {
    const navigate = useNavigate();

    const homeButtonProps: ButtonProps = {
        style: {
            width: 300,
            height: 200,
            fontSize: '2.4em',
        },
        type: 'primary',
        shape: 'round',
    };

    const iconColProps: ColProps = {
        span: 24,
        style: {
            textAlign: 'center',
            fontSize: '1.5em',
        },
    };
    
    const textColProps: ColProps = {
        span: 24,
        style: {
            textAlign: 'center',
        },
    };
    
    return (
        <PageWrapper
            showLogo={true}
            pageTitle="Let's Go"
        >
            <Row
                align="top"
                justify="center"
                gutter={20}
            >   
                {Object.keys(routes).map((key) => {
                    if (routes[key].title.toLowerCase() === 'home') {
                        return;
                    }

                    return (
                        <Col 
                            key={key}
                            style={{ marginTop: 20 }}
                        >
                            <Fade direction="left" duration={300} triggerOnce={true}>
                                <Button
                                    {...homeButtonProps}
                                    onClick={() => navigate(routes[key].path)}
                                >
                                    <Row
                                        align="middle"
                                        justify="center"
                                    >
                                        <Col 
                                            {...iconColProps}
                                            style={{ fontSize: '2em' }}
                                        >
                                            {routes[key].icon}
                                        </Col>

                                        <Col 
                                            {...textColProps}
                                        >
                                            {routes[key].title}
                                        </Col>
                                    </Row>
                            
                                </Button>
                            </Fade>
                        </Col>
                    );
                })}
            </Row>
        </PageWrapper>
    );
};