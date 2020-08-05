describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser({ username: 'test_user', password: 'password', name: 'james' });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('log in to application');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('test_user');
      cy.get('#password').type('password');
      cy.contains('login').click();
      cy.contains('Logged in as test_user');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('test_user');
      cy.get('#password').type('wrong_password');
      cy.contains('login').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'test_user', password: 'password' });
    });

    it('A blog can be created', () => {
      cy.contains('add new').click();
      cy.get('#title').type('My first blog');
      cy.get('#author').type('James');
      cy.get('#url').type('http://mycoolblog.com');
      cy.get('#create-blog').click();
      cy.get('.success').should('contain', 'a new blog');
      cy.contains('My first blog James');
      cy.get('#view-button').click();
      cy.contains('http://mycoolblog.com');
      cy.contains('0');
    });

    it('A blog can be liked', () => {
      cy.createBlog({
        author: 'James',
        title: 'My first blog',
        url: 'http://mycoolblog.com',
      });
      cy.get('#view-button').click();
      cy.contains('0');
      cy.get('#like-button').click();
      cy.contains('1');
    });

    it('Only the user who created a blog can delete it', () => {
      cy.createBlog({
        author: 'James',
        title: 'My first blog',
        url: 'http://mycoolblog.com',
      });
      cy.get('#view-button').click();
      cy.get('#remove-button').click();
      cy.contains('My first blog James').should('not.exist');
      cy.createBlog({
        author: 'James',
        title: 'My first blog',
        url: 'http://mycoolblog.com',
      });
      cy.get('#log-out-button').click();
      cy.createUser({ username: 'test_user_2', password: 'password', name: 'bob' });
      cy.login({ username: 'test_user_2', password: 'password' });
      cy.get('#view-button').click();
      cy.get('#remove-button').should('not.exist');
    });

    it('Blogs should be ordered according to likes', () => {
      cy.createBlog({
        author: 'James',
        title: 'My first blog',
        url: 'http://mycoolblog.com/blog_one',
        likes: 3,
      });
      cy.createBlog({
        author: 'James',
        title: 'My second blog',
        url: 'http://mycoolblog.com/blog_two',
        likes: 10,
      });
      cy.createBlog({
        author: 'James',
        title: 'My third blog',
        url: 'http://mycoolblog.com/blog_three',
        likes: 1,
      });
      cy.get('.likes').should('have.length', 3).then((likes) => {
        let currentLike = null;
        // eslint-disable-next-line no-restricted-syntax
        for (const like of likes) {
          if (currentLike === null) {
            currentLike = Number(like.innerText);
          } else {
            if (Number(like.innerText) > currentLike) {
              // eslint-disable-next-line no-throw-literal
              throw 'Blogs are not oredered according to likes';
            }
            currentLike = Number(like.innerText);
          }
        }
      });
    });
  });
});
