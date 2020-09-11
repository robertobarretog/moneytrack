import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { setTransaction } from '../../actions/transactionsActions';
import Button from '../common/Button';
import Spinner from '../common/Spinner/Spinner';

const ViewTransaction = ({
  history,
  transaction,
  match,
  setTransaction,
  loading,
}) => {
  useEffect(() => {
    setTransaction(match.params.id);
    // eslint-disable-next-line
  }, []);

  const onGoBack = () => history.push('/dashboard');

  const output = loading ? (
    <Spinner />
  ) : (
    <>
      <div className="container mx-auto flex flex-col justify-center items-center p-3">
        <h1 className="font-bold text-3xl">Transaction Details</h1>
        <Button
          value="Go Back"
          bgColor="blue"
          txtColor="orange"
          onClick={onGoBack}
        />
        <div className="bg-white mt-5 shadow overflow-hidden rounded-lg sm:max-w-xl">
          <div>
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="leading-5 font-semibold text-blue-600">Date</dt>
                <dd className="mt-2 leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {moment(transaction.date).format('MMMM Do, YYYY')}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="leading-5 font-semibold text-blue-600">Type</dt>
                <dd className="mt-2 leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.type}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="leading-5 font-semibold text-blue-600">
                  Amount
                </dt>
                <dd
                  className={`mt-2 leading-5 ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  } sm:mt-0 sm:col-span-2`}
                >
                  {numeral(transaction.amount / 100).format('$0,0.00')}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="leading-5 font-semibold text-blue-600">
                  Description
                </dt>
                <dd className="mt-2 leading-5 break-all text-gray-900 sm:mt-0 sm:col-span-2">
                  {transaction.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );

  return output;
};

const mapStateToProps = state => ({
  transaction: state.transactions.transaction,
  loading: state.transactions.loading,
});

export default connect(mapStateToProps, { setTransaction })(ViewTransaction);
