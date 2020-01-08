import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBAnimation,
  MDBCol,
  MDBJumbotron,
  MDBIcon,
  MDBEdgeHeader,
  MDBNavLink,
  MDBBtn
} from 'mdbreact';
import MenuLink from '../components/menuLink';
import API from './../utils/api';
import SpinnerPage from './../components/spinner';

const ComponentsNavPage = () => {
  const [blockData, setBlockData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await API.get(
        '/rawblock/0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103',
        {
          params: {
            cors: true
          }
        }
      );
      setBlockData(result.data.tx);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
      <MDBAnimation type='zoomIn' duration='500ms'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md='8' className='mt-3 mx-auto'>
              <MDBJumbotron>
                <MDBNavLink to={`/components/lastblock`} className="text-right"><MDBBtn color="pink">Last Block</MDBBtn></MDBNavLink>
                <h1 className='text-center'>
                  <MDBIcon icon='cubes' className='indigo-text mr-2' />
                  CHAINYARD
                </h1>

                <ul className='list-unstyled example-components-list'>
                  {loading ? (
                    <div className='spinner'>
                      <SpinnerPage />
                    </div>
                  ) : null}
                  {blockData && blockData.length > 0
                    ? blockData.map((block, index) => {
                        return (
                          <MenuLink
                            to={`/components/${block.hash}`}
                            title={block.hash.substring(0, 30)}
                            key={index}
                          />
                        );
                      })
                    : null}
                </ul>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBAnimation>
    </>
  );
};

export default ComponentsNavPage;
