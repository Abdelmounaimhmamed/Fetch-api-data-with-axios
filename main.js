// to set global token : 
// accessible for all axios.* methods . 
axios.defaults.headers.common['X-auth-token'] = "my token";

// GET REQUEST

function getTodos() {
    console.log('GET Request');
    // axios({
    //     method : "GET",
    //     url : "https://jsonplaceholder.typicode.com/todos"
    // }).then(res => showOutput(res))
    //    .catch(err => console.log(err));
    axios.get("https://jsonplaceholder.typicode.com/todos" , 
    {
        params : {
            _limit : 5
        }
    }).then(res => showOutput(res))
    .catch(err => console.log(err));

  }
  
  // POST REQUEST
  function addTodo() {
    console.log('POST Request');
    axios({
        method : "POST",
        url : "https://jsonplaceholder.typicode.com/todos",
        data :  {
            title : "complete kubernetes",
            completed : false
        },

    }).then(res => showOutput(res))
    .catch(err => console.log(err));
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    console.log('PUT/PATCH Request');
    axios({
        method : "PUT",
        url : "https://jsonplaceholder.typicode.com/todos/1",
        data : {
            title : "updated data by put method ",
            completed : true
        }
    }).then(res => showOutput(res))
    .catch(err => console.log(err.message));
    axios({
        method : "PATCH",
        url : "https://jsonplaceholder.typicode.com/todos/1",
        data : {
            title : "updated by patch method",
            completed : true
        }
    })
  };

  
  // DELETE REQUEST
  function removeTodo() {
    console.log('DELETE Request');
    axios({
        method : "DELETE",
        url : "https://jsonplaceholder.typicode.com/todos/1"
    }).then( res => showOutput(res))
    .catch(err => console.log(err));
  }

  
  // SIMULTANEOUS DATA
  function getData() {
    console.log('Simultaneous Request');
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos/?_limit=3"),
        axios.get("https://jsonplaceholder.typicode.com/posts/?_limit=3")
    ])
    // .then( res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);
    // })
    .then(axios.spread((todos,posts) => showOutput(posts)))
    .catch( err => {
        console.log(err);
    })
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    console.log('Custom Headers');
    const config = {
        headers : {
            "Content-Type" : "application/json",
            Authorization  : "someToken" 
        }
    }
    axios.post("https://jsonplaceholder.typicode.com/posts" ,{
        title : "complete kubernetes",
        completed : false
    },config).then(res => showOutput(res))
    .catch(err => console.log(err));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  }
  
  // ERROR HANDLING
  function errorHandling() {
    console.log('Error Handling');
    axios.get("https://jsonplaceholder.typicode.com/postss")
    .then(res => showOutput(res))
    .catch(err => {
         if( err.response){ // if the server respond with a status other than 200 
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            if (err.response.status === 404 || err.response.status != 200){
                alert("Error not found !");
            }
         }else if (err.request){ // request was made but there is no respond . 
            console.log(err.request);

         }else {
            console.log(err.message);
         }
    })
}

  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
    const source = axios.CancelToken.source();
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=3" , {
        cancelToken : source.token
    })
    .then(res => showOutput(res))
    .catch(err => {
         if( err.response){ // if the server respond with a status other than 200 
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            if (err.response.status === 404 || err.response.status != 200){
                alert("Error not found !");
            }
         }else if (err.request){ // request was made but there is no respond . 
            console.log(err.request);

         }else {
            console.log(err.message);
         }
    })
   
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(config => {
    console.log(`${config.method} sent to ${config.url} at ${new Date()}`);
    return config;
  }, (err) => {
    return new Promise.reject(err);
  });
  
  // AXIOS INSTANCES
  const axiosInstance = axios.create({
        baseURL : "https://jsonplaceholder.typicode.com/",
  })
  axiosInstance.get("comments?_limit=3").then(res => showOutput(res)).catch(err => console.log(err));
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);