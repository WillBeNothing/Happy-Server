import Images from '../app/models/Images';

export default {
  render(image: Images) {
    return {
      url: `http://192.168.0.110:3333/images/${image.path}`,
    };
  },

  renderMany(images: Images[]) {
    return images.map((image) => this.render(image));
  },
};
