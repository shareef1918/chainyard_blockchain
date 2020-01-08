import React, { useEffect, useState, Fragment } from 'react';
import SpinnerPage from './../components/spinner';
import API from './../utils/api';
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBAnimation,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBNavLink,
  MDBBtn
} from 'mdbreact';

const AdvancedNavPage = props => {
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result = {};
      if(props.match.params.hash === 'lastblock') {
        result = await API.get('/latestblock',{
          params: {
            cors: true,
            lastblock: true
          }
        });
        result.data.block_height = result.data.height;
        result.data.size = 'N/A';
        result.data.weight = 'N/A';
        result.data.tx_index = result.data.block_index;
      }else {
        result = await API.get('/rawtx/' + props.match.params.hash, {
          params: {
            cors: true
          }
        });
      }
      setBlock(result.data);
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
                {loading ? (
                  <div className='spinner'>
                    <SpinnerPage />
                  </div>
                ) : (
                  <Fragment>
                    <MDBNavLink to={`/components`} link><MDBBtn color="cyan">Back</MDBBtn></MDBNavLink>
                    <MDBTable>
                      <MDBTableHead color='primary-color' textWhite>
                        <tr>
                          <th>Index</th>
                          <th>Weight</th>
                          <th>Height</th>
                          <th>Time</th>
                          <th>Size</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        <tr>
                          <td>{block.tx_index}</td>
                          <td>{block.weight}</td>
                          <td>{block.block_height}</td>
                          <td>{block.time}</td>
                          <td>{block.size}</td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                  </Fragment>
                )}
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBAnimation>
    </>
  );
};

export default AdvancedNavPage;
