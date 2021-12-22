import * as React from 'react';

import { Button, ButtonProps, Col, ColProps, Row } from 'antd';

import { Fade } from 'react-awesome-reveal';
import { PageWrapper } from '../../components/pageWrapper';
import { UserOutlined } from '@ant-design/icons';
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
            pageTitle="Home"
        >
            <Row
                align="top"
                justify="center"
                gutter={20}
            >   
                <Col 
                    style={{ marginTop: 20 }}
                >
                    <Fade direction="left" duration={300} triggerOnce={true}>
                        <Button
                            {...homeButtonProps}
                            onClick={() => navigate('/page1')}
                        >
                            <Row
                                align="middle"
                                justify="center"
                            >
                                <Col 
                                    {...iconColProps}
                                >
                                    <UserOutlined />
                                </Col>

                                <Col 
                                    {...textColProps}
                                >
                                    Page 1
                                </Col>
                            </Row>
                            
                        </Button>
                    </Fade>
                </Col> 

                
            </Row>
        </PageWrapper>
    );
};