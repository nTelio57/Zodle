import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

class ApiClient {
  handleError(code) {
    switch (code) {
      case 500:
        throw new Error('Internal server error');
    }
  }

  async get(path) {
    try {
      const response = await axios.get(path);
      const data = await response.data;
      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
        return e.response.data;
      }
    }
  }

  async post(path, body) {
    try {
      const response = await axios.post(path, body);
      const data = await response.data;
      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
      }
    }
  }

  async postForm(path, body) {
    try {
      const response = await axios.postForm(path, body);
      const data = await response.data;
      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
      }
    }
  }

  async put(path, body) {
    try {
      const response = await axios.put(path, body);
      const data = await response.data;
      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
        return e.response.data;
      }
    }
  }

  async delete(path, body) {
    try {
      const response = await body ? axios.delete(path, { data: body }) : axios.delete(path);
      const data = await response.data;
      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
      }
    }
  }

  async download(path) {
    try {
      const link = document.createElement('a');
      link.style='display: none';
      link.href = path;
      link.click();
      link.parentNode.removeChild(link);
    }
    catch (e) {
      if (e.response && e.response.status) {
        this.handleError(e.response.status);
      }
    }
  }
}

export default new ApiClient();
